import { FC } from 'react';
import { bem } from './VersionList.cn';
import { Item } from './components/Item';

export interface VersionListProps { versions: (string | null)[]; projectCode: string }

export const VersionList: FC<VersionListProps> = (props) => {
  const { versions, projectCode } = props;

  const items = versions.map((v) => <Item key={v} version={v} projectCode={projectCode} />);

  return <div className={bem()}>{items}</div>;
};
