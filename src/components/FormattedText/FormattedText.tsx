import { FC, useContext } from 'react';
import {
  ProjectContext
} from '@/components/ProjectContext/ProjectContext';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { MarkDownCode } from './components/MarkDownCode';
import { MarkDownLink } from './components/MarkDownLink';
import { bem } from './FormattedText.cn';
import './FormattedText.css';

function featureLinks(project?: string, version?: string, treeCode?: string) {
  const transform = (tree: Node) => {
    visit(tree, ['text'], (node: any) => {
      const { value } = node;
      const match = value.match(/\$([A-Za-z][A-Za-z0-9-_]*)/);
      if (match) {
        const [fullMatch, feature] = match;
        const start = value.indexOf(fullMatch);
        const end = start + fullMatch.length;
        const before = value.slice(0, start);
        const after = value.slice(end);
        const beforeNode = { type: 'text', value: before };
        const linkNode = {
          type: 'link',
          url: `/project/${project}?feature=${feature}${version ? `&version=${version}` : ''
            }${treeCode ? `&tree=${treeCode}` : ''
            }`,
          title: feature,
          children: [{ type: 'text', value: feature }]
        };
        const afterNode = { type: 'text', value: after };
        node.type = 'root';
        node.value = '';
        node.children = [beforeNode, linkNode, afterNode];
      }
    });
  };

  return () => transform;
}

type FormattedTextProps = {
  className?: string;
  text: string;
};

export const FormattedText: FC<FormattedTextProps> = (props) => {
  const { className, text } = props;

  const { project, version, tree } = useContext(ProjectContext) || {};

  const components = {
    a: MarkDownLink,
    code: MarkDownCode
  };

  return <Markdown
    className={bem(null, className)}
    remarkPlugins={[featureLinks(project, version, tree), gfm]}
    components={components}
  >
    {text}
  </Markdown>;
};
