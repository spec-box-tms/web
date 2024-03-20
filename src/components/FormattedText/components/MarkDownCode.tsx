import * as model from '@/model/pages/project';
import { Copy } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react';
import { useCallback } from 'react';
import { ExtraProps } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { bem } from '../FormattedText.cn';
import { MarkDownMermaid } from './MarkDownMermaid';

type MarkDownCodeProps = JSX.IntrinsicElements['code'] & ExtraProps;

export const MarkDownCode = (props: MarkDownCodeProps) => {
  const { children, className, ...rest } = props;

  const copyToClipboard = useEvent(model.copyToClipboard);
  const onClickCopyButton = useCallback(() => {
    copyToClipboard({ text: String(children) });
  }, [children, copyToClipboard]);

  const match = /language-(\w+)/.exec(className || '');
  if (match) {
    if (match[1] === 'mermaid') {
      return <MarkDownMermaid>{children}</MarkDownMermaid>;
    }

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
};
