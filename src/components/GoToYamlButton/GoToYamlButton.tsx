import { buildUrl } from '@/helpers/buildUrl';
import { Button } from '@gravity-ui/uikit';
import { FC, useMemo } from 'react';

interface GoToYamlButtonProps {
  filePath?: string;
  repositoryUrl?: string;
}
export const GoToYamlButton: FC<GoToYamlButtonProps> = (props) => {
  const { filePath, repositoryUrl } = props;

  const link = useMemo(
    () => buildUrl(filePath, repositoryUrl),
    [filePath, repositoryUrl]
  );

  if (!link) {
    return null;
  }

  return <Button
    href={link}
    target="_blank"
    size="m"
    view="outlined"
    pin="circle-circle"
  >
    Перейти к YML
  </Button>;
};
