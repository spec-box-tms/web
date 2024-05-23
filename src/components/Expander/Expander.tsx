import { FC, ReactNode, useCallback, useState } from 'react';
import { bem } from './Expander.cn';
import { ArrowToggle } from '@gravity-ui/uikit';
import './Expander.css';

interface ExpanderProps {
  title: string;
  children: ReactNode;
}
export const Expander: FC<ExpanderProps> = (props) => {
  const { title, children } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const onExpanderClick = useCallback(() => {
    setIsExpanded((value) => !value);
  },
    [setIsExpanded]);

  return <div className={bem()}>
    <div className={bem('Title')}>
      <div className={bem('Expander')} onClick={onExpanderClick}>
        <ArrowToggle direction={isExpanded ? 'bottom' : 'top'}></ArrowToggle>
      </div>
      {title}
    </div>
    {isExpanded && children}
  </div>;
};
