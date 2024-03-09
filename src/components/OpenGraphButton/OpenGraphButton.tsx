import { FeatureRelations } from '@/types';
import { cn } from '@bem-react/classname';
import { CodeFork } from '@gravity-ui/icons';
import { Button, Icon, Modal } from '@gravity-ui/uikit';
import { FC, useState } from 'react';
import { FeatureGraph } from '../FeatureGraph/FeatureGraph';
import './OpenGraphButton.css';

const bem = cn('OpenGraphButton');

interface OpenGraphButtonProps {
  onFeatureSeleted?: (feature: string) => void;
  data: FeatureRelations;
}

export const OpenGraphButton: FC<OpenGraphButtonProps> = (props) => {
  const { data, onFeatureSeleted } = props;
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const handleFeatureSelected = (feature: string) => {
    if (onFeatureSeleted) {
      onFeatureSeleted(feature);
      setIsGraphOpen(false);
    }
  };

  return <>
    <Button
      view="outlined"
      pin="circle-circle"
      onClick={() => setIsGraphOpen(prev => !prev)}
    >
      <Icon data={CodeFork} />
    </Button>
    <Modal
      contentClassName={bem('ModalContainer')}
      open={isGraphOpen}
      onClose={() => setIsGraphOpen(false)}
    >
      <FeatureGraph
        data={data}
        onClose={() => setIsGraphOpen(false)}
        onFeatureSelected={handleFeatureSelected}
      />
    </Modal>
  </>;
};
