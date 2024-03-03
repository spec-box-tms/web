import { TreeNode } from '@/types';
import { Select, SelectOption, TextInput } from '@gravity-ui/uikit';
import { FC, useCallback, useEffect, useState } from 'react';
import { ProjectFeatures } from '../ProjectFeatures/ProjectFeatures';

import { useDebounce } from '@/hooks/useDebounce';
import * as model from '@/model/pages/project';
import { useStore } from 'effector-react/scope';
import { bem } from './ProjectTree.cn';
import './ProjectTree.css';
import { InfiniteLoader } from '../InfiniteLoader/InfiniteLoader';

const countMatches = (text: string, words: string[]): number => {
  return words.reduce((acc, word) => {
    return acc + (text.toLowerCase().includes(word.toLowerCase()) ? 1 : 0);
  }, 0);
};

const searchTreeNodes = (tree: TreeNode[], search: string): TreeNode[] => {
  if (search.length === 0) {
    return tree;
  }

  const words = search.split(' ').filter((word) => word.length > 0);
  const found = tree.filter((node) => {
    if (node.title === undefined) return false;
    const countMatchesInTitle = countMatches(node.title, words);
    let countMatchesInCode = 0;
    if (node.type === 'feature') {
      countMatchesInCode = countMatches(node.featureCode, words);
    }
    return countMatchesInTitle === words.length || countMatchesInCode === words.length;
  });

  const distinctNodes = new Set<TreeNode>();

  // выбор всех потомков
  found.forEach((node) => {
    let queue = [node];
    while (queue.length) {
      const current = queue.shift();
      if (current) {
        distinctNodes.add(current);
        queue = queue.concat(tree.filter((n) => n.parentId === current.id));
      }
    }
  });

  // выбор всех родителей
  found.forEach((node) => {
    distinctNodes.add(node);
    let current = node;

    while (current.parentId) {
      const parent = tree.find((n) => n.id === current.parentId);
      if (parent) {
        distinctNodes.add(parent);
        current = parent;
      } else {
        break;
      }
    }
  });

  return [...distinctNodes.values()];
};

interface ProjectTreeProps {
  isPending: boolean;
  isPendingStructure: boolean;
  selectedTree: string | null;
  tree: TreeNode[];
  onTreeSelected: (treeCode: string) => void;
  onFeatureSelected: (featureCode: string) => void;
  selectedFeatureCode?: string;
}

export const ProjectTree: FC<ProjectTreeProps> = (props) => {
  const { 
    isPending, 
    isPendingStructure, 
    tree, 
    selectedTree,
    onFeatureSelected, 
    selectedFeatureCode, 
    onTreeSelected, 
  } = props;
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 300);
  const [filtredTree, setFiltredTree] = useState<TreeNode[]>([]);
  const trees = useStore(model.$trees);

  const handleTreeSelected = useCallback((treeCodes: string[]) => {
    onTreeSelected(treeCodes[0]);
  }, [onTreeSelected]);


  const treesSelectOptions: SelectOption[] = [
    { value: '', content: 'Все' },
    ...trees.map(({ code, title }) => ({ value: code, content: title }))
  ];

  useEffect(() => {
    setFiltredTree(searchTreeNodes(tree, searchDebounce));
  }, [searchDebounce, tree]);

  if (isPending) {
    return <InfiniteLoader />;
  } else {
    return (
      <div className={bem('Container')}>
        <Select
          size="m"
          placeholder="Структура"
          options={treesSelectOptions}
          onUpdate={handleTreeSelected} value={[selectedTree || '']}
          label="Структура:"
        />
        <TextInput
          value={search}
          hasClear={true}
          label="Поиск:"
          onChange={(e) => setSearch(e.target.value)}
        />
        {
          isPendingStructure ?
            <InfiniteLoader /> :
            <ProjectFeatures tree={filtredTree} onFeatureSelected={onFeatureSelected} selectedFeatureCode={selectedFeatureCode} />
        }
      </div>
    );
  }
};
