import mermaid from 'mermaid';
import { FC, ReactNode, useEffect } from 'react';
import { bem } from '../FormattedText.cn';

interface MarkDownMermaidProps {
  children: ReactNode;
}

export const MarkDownMermaid: FC<MarkDownMermaidProps> = ({ children }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className={bem('CodeBlock') + ' mermaid'}>
      {children}
  </div>;
};
