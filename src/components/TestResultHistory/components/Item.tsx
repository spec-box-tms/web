import { FormattedText } from '@/components/FormattedText/FormattedText';
import { ListItem } from '@/components/ListItem/ListItem';
import { TestResultIcon } from '@/components/TestResultIcon/TestResultIcon';
import { VersionLabel } from '@/components/VersionLabel/VersionLabel';
import { formatDate } from '@/helpers/formatDate';
import { TestResultHistory } from '@/types';
import { ArrowRightToLine, CircleInfo } from '@gravity-ui/icons';
import { Button, Icon, Popup, Tooltip } from '@gravity-ui/uikit';
import { FC, useRef, useState } from 'react';
import { bem } from '../TestResultHistory.cn';
import './Item.css';

interface ItemProps {
  isActive: boolean;
  testResultHistory: TestResultHistory;
}

export const Item: FC<ItemProps> = (props) => {
  const { isActive, testResultHistory } = props;
  const infoButton = useRef<HTMLButtonElement>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);


  const before = isActive ?
    <Tooltip content="Текущий тест">
      <Icon data={ArrowRightToLine} />
    </Tooltip> :
    <TestResultIcon status={testResultHistory.status} />;

  const after = testResultHistory.report ?
    <>
      <Button pin="circle-circle" ref={infoButton} onClick={() => setIsInfoOpen(prev => !prev)}>
        <Icon data={CircleInfo} />
      </Button>
      <Popup contentClassName={bem('PopupContainer')} anchorRef={infoButton} open={isInfoOpen} onClose={() => setIsInfoOpen(false)}>
        <FormattedText text={testResultHistory.report} />
      </Popup>
    </>
    : null;

  return (
    <ListItem view='flat' before={before} after={after}>
      <div className={bem('Content')}>
        <div className={bem('Title')}>
          <VersionLabel version={testResultHistory.version} />
          {testResultHistory.testRunTitle}
        </div>
        <div className={bem('Description')}>Завершен: {formatDate(testResultHistory.completedAt)}</div>
      </div>
    </ListItem>
  );
};
