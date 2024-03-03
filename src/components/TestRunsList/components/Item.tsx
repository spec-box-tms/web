import { FC } from 'react';

import { TestRun } from '@/types';

import { bem } from '../TestRunsList.cn';

import { ListItem } from '@/components/ListItem/ListItem';
import * as model from '@/model/pages/testRuns';
import { useStore, useUnit } from 'effector-react/scope';
import './Item.css';
import { Label } from '@gravity-ui/uikit';
import { CircleCheckFill, CircleDashed, Clock } from '@gravity-ui/icons';

function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;
}

function getIcon(testRun: TestRun) {
  if (testRun.completedAt) {
    return <CircleCheckFill color="rgb(50, 186, 118)" />;
  }
  if (testRun.startedAt) {
    return <Clock color="rgb(48, 114, 179)" />;
  }

  return <CircleDashed color="gray" />;
}

interface ItemProps {
  testRun: TestRun;
}

export const Item: FC<ItemProps> = (props) => {
  const { testRun } = props;

  const selectedTestRun = useStore(model.$selectedTestRun);

  const handleSelectTestRun = useUnit(model.selectTestRun);

  return (
    <ListItem
      className={bem('Item')}
      view="flat"
      isActive={selectedTestRun?.id === testRun.id}
      onPress={() => handleSelectTestRun(testRun)}
    >
      <div className={bem('Title')}>
        <div className={bem('TitleText')}>
          {getIcon(testRun)}
          {testRun.title}
        </div>
        <Label>v: {testRun.version ?? 'по-умолчанию'}</Label>
      </div>
      <div className={bem('Description')}>
        {formatDate(testRun.createdAt)}
        {testRun.completedAt && ' - ' + formatDate(testRun.completedAt)}
      </div>
    </ListItem>
  );
};
