import { Button, Icon } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback } from 'react';
import * as model from '@/model/pages/project';
import { Copy } from '@gravity-ui/icons';

interface CopyFeatureCodeButtonProps {
  code: string;
}
export const CopyFeatureCodeButton: FC<CopyFeatureCodeButtonProps> = (props) => {
  const { code } = props;
  const copyToClipboard = useEvent(model.copyToClipboard);
  const onClickCopyButton = useCallback(() => {
    copyToClipboard({ text: code });
  }, [code, copyToClipboard]);

  return <Button
    view="outlined"
    size="m"
    pin="circle-circle"
    onClick={onClickCopyButton}
  >
    {code}
    <Icon size={16} data={Copy} />
  </Button>;
};
