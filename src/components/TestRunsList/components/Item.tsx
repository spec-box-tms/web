import { ListItem } from '@/components/ListItem/ListItem';
import { ProjectContext } from '@/components/ProjectContext/ProjectContext';
import { RouteLink } from '@/components/RouteLink/RouteLink';
import { TestRunStateIcon } from '@/components/TestRunStateIcon/TestRunStateIcon';
import { VersionLabel } from '@/components/VersionLabel/VersionLabel';
import { formatDate } from '@/helpers/formatDate';
import { formatInterval } from '@/helpers/formatInterval';
import { testRunExecutionRoute } from '@/model/pages/testRunExecution';
import { TestRun } from '@/types';
import { ArrowRightToSquare } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { useStore, useUnit } from 'effector-react/scope';
import { FC, useContext } from 'react';

import { bem } from '../TestRunsList.cn';
import './Item.css';

import * as model from '@/model/pages/testRuns';

interface ItemProps {
  testRun: TestRun;
}

export const Item: FC<ItemProps> = (props) => {
  const { testRun } = props;
  const context = useContext(ProjectContext);
  const selectedTestRun = useStore(model.$selectedTestRun);

  const handleSelectTestRun = useUnit(model.selectTestRun);

  const duration = testRun.completedAt ?
    formatInterval(testRun.completedAt.getTime() - testRun.createdAt.getTime()) :
    null;

  return (
    <ListItem
      className={bem('Item')}
      view="flat"
      isActive={selectedTestRun?.id === testRun.id}
      onPress={() => handleSelectTestRun(testRun)}
    >
      <div className={bem('ItemContent')}>
        <div className={bem('ItemText')}>
          <div className={bem('Title')}>
            <div className={bem('TitleText')}>
              <TestRunStateIcon testRun={testRun} />
              {testRun.title}
            </div>
            <VersionLabel version={testRun.version} />
          </div>
          <div className={bem('Description')}>
            {formatDate(testRun.createdAt)}
            {duration && ` - Длительность: ${duration}`}
          </div>
        </div>
        <RouteLink to={testRunExecutionRoute} params={{ project: context?.project || '', testrun: testRun.id }}>
          <Icon size={32} data={ArrowRightToSquare} />
        </RouteLink>
      </div>
    </ListItem>
  );
};
