// component for Version List item displaying string version

import { FC } from 'react';
import { bem } from '../VersionList.cn';
import '../VersionList.css';
import { ListItem } from '@/components/ListItem/ListItem';
import { useRouteLink } from '@/hooks/useRouteLink';
import { projectRoute } from '@/model';

export interface VersionListItemProps {
  projectCode: string;
  version: string | null;
}

export const Item: FC<VersionListItemProps> = (props) => {
  const { version, projectCode } = props;

  const { href, handler } = useRouteLink({
    to: projectRoute,
    params: { project: projectCode},
    query: version ? { version } : undefined,
  });

  return (
    <ListItem
      className={bem('Item')}
      view="flat"
      href={href}
      onPress={handler}
    >
      <div className={bem('Version')}>{version ? version : 'default'}</div>
    </ListItem>
  );
};
