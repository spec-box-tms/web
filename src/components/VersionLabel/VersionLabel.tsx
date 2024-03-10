import { Label } from '@gravity-ui/uikit';
import { FC, useContext } from 'react';
import { ProjectContext } from '../ProjectContext/ProjectContext';

export const VersionLabel: FC<{ version?: string, isActive?: boolean }> = ({ version }) => {
  const projectContext = useContext(ProjectContext);
  const activeVersion = projectContext?.version;

  return <Label theme={activeVersion === version ? 'info' : 'clear'}>v: {version ?? 'по-умолчанию'}</Label>;
};
