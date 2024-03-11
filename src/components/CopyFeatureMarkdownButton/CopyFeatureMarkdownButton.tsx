import { Button, Icon } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback } from 'react';
import * as model from '@/model/pages/project';
import { Copy, LogoMarkdown } from '@gravity-ui/icons';
import { Feature } from '@/types';
import { featureToMarkdown } from '@/helpers/featureToMarkDown';

interface CopyFeatureCodeButtonProps {
  feature: Feature;
}
export const CopyFeatureMarkdownButton: FC<CopyFeatureCodeButtonProps> = (props) => {
  const { feature } = props;
  const copyToClipboard = useEvent(model.copyToClipboard);
  const onClickCopyButton = useCallback(() => {
    copyToClipboard({ text: featureToMarkdown(feature) });
  }, [feature, copyToClipboard]);

  return <Button
    view="outlined"
    size="m"
    pin="circle-circle"
    onClick={onClickCopyButton}
  >
    <Icon size={16} data={LogoMarkdown} />
    Markdown
    <Icon size={16} data={Copy} />
  </Button>;
};
