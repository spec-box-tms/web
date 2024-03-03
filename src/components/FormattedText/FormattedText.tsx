import { FC, ReactNode, useCallback, useContext } from 'react';

import {
  ProjectContext
} from '@/components/ProjectContext/ProjectContext';
import { Button, Icon, Link } from '@gravity-ui/uikit';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import './FormattedText.css';
import { bem } from './FormattedText.cn';
import { useEvent } from 'effector-react/scope';
import * as model from '@/model/pages/project';
import { Copy } from '@gravity-ui/icons';

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

function MarkDownLink(props: { href?: string; children?: ReactNode }) {
  const { href, children } = props;
  const loadFeature = useEvent(model.loadFeature);
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href
      && href.startsWith('/project')
      && href.includes('feature')
      && e.button === 0
      && !e.ctrlKey
      && !e.metaKey
      && !e.shiftKey
      && !e.altKey) {
      e.preventDefault();
      loadFeature({ feature: href.split('feature=')[1].split('&')[0] });
    }
  },
    [href, loadFeature]);
  if (href && href.startsWith('/project') && href.includes('feature')) {
    return <Link href={href} onClick={handleClick}> {children}</Link >;
  }
  return <Link href={href}>{children}</Link>;
}

function MarkDownCode(props: { children?: ReactNode; className?: string }) {
  const { children, className, ...rest } = props;

  const copyToClipboard = useEvent(model.copyToClipboard);
  const onClickCopyButton = useCallback(() => {
    copyToClipboard({ text: String(children) });
  }, [children, copyToClipboard]);


  const match = /language-(\w+)/.exec(className || '');
  if (match) {

    return (<div className={bem('CodeBlock', className)}>
      <Button
        view="outlined"
        size="m"
        pin="circle-circle"
        onClick={onClickCopyButton}
      >
        <Icon className={bem('CopyIcon')} size={16} data={Copy} />
      </Button>
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        children={String(children).replace(/\n$/, '')}
      />
    </div>);
  }
  return (
    <code {...rest} className={bem('Code', className)}>
      {children}
    </code>
  );
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
    remarkPlugins={[featureLinks(project, version, tree)]}
    components={components}>
    {text}
  </Markdown>;
};
