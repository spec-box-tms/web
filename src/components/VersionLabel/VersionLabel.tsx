import { Label } from '@gravity-ui/uikit';
import { FC } from 'react';

export const VersionLabel: FC<{ version?: string }> = ({ version }) => {
  return <Label>v: {version ?? 'по-умолчанию'}</Label>;
};
