import { ListItem } from '@/components/ListItem/ListItem';
import { ProjectContext } from '@/components/ProjectContext/ProjectContext';
import { RouteLink } from '@/components/RouteLink/RouteLink';
import { TestRunStateIcon } from '@/components/TestRunStateIcon/TestRunStateIcon';
import { formatDate } from '@/helpers/formatDate';
import { testRunExecutionRoute } from '@/model/pages/testRunExecution';
import * as model from '@/model/pages/testRuns';
import { TestRun } from '@/types';
import { ArrowRightToSquare } from '@gravity-ui/icons';
import { Icon, Label } from '@gravity-ui/uikit';
import { useStore, useUnit } from 'effector-react/scope';
import { FC, useContext } from 'react';
import { bem } from '../TestRunsList.cn';
import './Item.css';

interface ItemProps {
  testRun: TestRun;
}

export const Item: FC<ItemProps> = (props) => {
  const { testRun } = props;
  const context = useContext(ProjectContext);
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
          <TestRunStateIcon testRun={testRun} />
          {testRun.title}
          <RouteLink to={testRunExecutionRoute} params={{ project: context?.project || '', testrun: testRun.id }}>
            <Icon data={ArrowRightToSquare} />
          </RouteLink>
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
