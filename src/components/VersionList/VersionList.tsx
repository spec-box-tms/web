import { FC } from 'react';
import { bem } from './VersionList.cn';
import { Item } from './components/Item';
import { Version } from '@/types';

export interface VersionListProps { versions: Version[]; projectCode: string }

export const VersionList: FC<VersionListProps> = (props) => {
  const { versions, projectCode } = props;

  const sortedVersions = [...versions].sort((a, b) => {
    if (a.version === undefined) return -1;
    if (a.updatedAt === undefined) return 1;
    if (b.updatedAt === undefined) return -1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const items = sortedVersions.map((v) => <Item key={v.version || 'default'} version={v} projectCode={projectCode} />);

  return <div className={bem()}>{items}</div>;
};
