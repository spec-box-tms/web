import { cn } from '@bem-react/classname';
import { Loader } from '@gravity-ui/uikit';
import './InfiniteLoader.css';

const bem = cn('InfiniteLoader');

export const InfiniteLoader = () => {
  return <div className={bem()}>
    <Loader size="m" />
  </div>;
};
