import { FeatureRelations } from '@/types';
import { cn } from '@bem-react/classname';
import { CodeFork } from '@gravity-ui/icons';
import { Button, Icon, Modal } from '@gravity-ui/uikit';
import { FC, useContext, useState } from 'react';
import { FeatureGraph } from '../FeatureGraph/FeatureGraph';
import './OpenGraphButton.css';
import { TestRunExecutionContext } from '../TestRunExecutionContext/TestRunExecutionContext';

const bem = cn('OpenGraphButton');

interface OpenGraphButtonProps {
  onFeatureSelected?: (feature: string) => void;
  data: FeatureRelations;
  featureCode: string;
}

export const OpenGraphButton: FC<OpenGraphButtonProps> = (props) => {
  const { data, onFeatureSelected, featureCode } = props;
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const testRunExecutionContext = useContext(TestRunExecutionContext);
  const testResults = testRunExecutionContext?.testResults || undefined;

  const handleFeatureSelected = (feature: string) => {
    if (onFeatureSelected) {
      onFeatureSelected(feature);
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
        rootFeatureCode={featureCode}
        onClose={() => setIsGraphOpen(false)}
        onFeatureSelected={handleFeatureSelected}
        testResults={testResults}
      />
    </Modal>
  </>;
};
