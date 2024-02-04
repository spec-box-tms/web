import { TreeNode } from '@/types';
import { FC, useEffect, useState } from 'react';
import { ProjectFeatures } from '../ProjectFeatures/ProjectFeatures';
import { Label, TextInput } from '@gravity-ui/uikit';

import './ProjectTree.css';
import { bem } from './ProjectTree.cn';
import { useDebounce } from '@/hooks/useDebounce';

const countMatches = (text: string, words: string[]): number => {
  return words.reduce((acc, word) => {
    return acc + (text.toLowerCase().includes(word.toLowerCase()) ? 1 : 0);
  }, 0);
}

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
}


interface ProjectTreeProps {
  isPending: boolean;
  tree: TreeNode[];
  onFeatureSelected: (featureCode: string) => void;
  selectedFeatureCode?: string;
}

export const ProjectTree: FC<ProjectTreeProps> = (props) => {
  const { isPending, tree, onFeatureSelected, selectedFeatureCode } = props;
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 300);
  const [filtredTree, setFiltredTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    setFiltredTree(searchTreeNodes(tree, searchDebounce));
  }, [searchDebounce, tree]);

  if (isPending) {
    return <div>загрузка</div>;
  } else {
    return (
      <div className={bem('Container')}>
        <TextInput
          value={search}
          hasClear={true}
          leftContent={<Label size="s">Поиск:</Label>}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ProjectFeatures
          tree={filtredTree}
          selectedFeatureCode={selectedFeatureCode}
          onFeatureSelected={onFeatureSelected}
        />
      </div>
    );
  }
};
