import * as model from '@/model/pages/testRuns';
import { TestResultStatus } from '@/types';
import { CircleCheckFill, CircleChevronsRight, CircleDashed, CircleExclamation, CircleMinusFill, CircleXmarkFill } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { useStore } from 'effector-react/scope';
import { FC, useCallback, useState } from 'react';
import { InfiniteLoader } from '../InfiniteLoader/InfiniteLoader';
import { TestRunProgress } from '../TestRunProgress/TestRunProgress';
import { bem } from './TestRunDetail.cn';
import './TestRunDetails.css';
import { TestResultsByFeature } from './components/TestResultsByFeature';

export const TestRunDetails: FC = () => {
  const testResults = useStore(model.$testResults);
  const testResultsIsLoading = useStore(model.$testResultsIsLoading);

  const [activeStatus, setActiveStatus] = useState<TestResultStatus | undefined>(undefined);

  const handleStatusClick = useCallback((status?: TestResultStatus) => {
    setActiveStatus(status);
  }, [setActiveStatus]);

  if (!testResults || testResultsIsLoading) {
    return <InfiniteLoader />;
  }
  const total = testResults.length;
  const notstarted = testResults.filter((r) => r.status === 'NEW').length;
  const passed = testResults.filter((r) => r.status === 'PASSED').length;
  const failed = testResults.filter((r) => r.status === 'FAILED').length;
  const blocked = testResults.filter((r) => r.status === 'BLOCKED').length;
  const invalid = testResults.filter((r) => r.status === 'INVALID').length;
  const skipped = testResults.filter((r) => r.status === 'SKIPPED').length;

  return <>
    <div className={bem('Progress')}>
      <TestRunProgress testResults={testResults} />
    </div>
    <div className={bem('Statuses')}>
      <Button
        width="max"
        view="outlined"
        pin="circle-brick"
        size="m"
        onClick={() => handleStatusClick(undefined)}
        selected={activeStatus === undefined}
      >
        Всего: {total}
      </Button>
      <Button
        width="max"
        view="outlined-info"
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('NEW')}
        selected={activeStatus === 'NEW'}
      >
        <Icon data={CircleDashed} />
        Не начато: {notstarted}
      </Button>
      <Button
        width="max"
        view="outlined-success"
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('PASSED')}
        selected={activeStatus === 'PASSED'}
      >
        <Icon data={CircleCheckFill} />
        Пройдено: {passed}
      </Button>
      <Button
        width="max"
        view="outlined-danger"
        pin="brick-brick"
        size="m" onClick={() => handleStatusClick('FAILED')}
        selected={activeStatus === 'FAILED'}
      >
        <Icon data={CircleXmarkFill} />
        Провалено: {failed}
      </Button>
      <Button
        width="max"
        view="outlined-warning"
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('BLOCKED')}
        selected={activeStatus === 'BLOCKED'}
      >
        <Icon data={CircleMinusFill} />
        Заблокировано: {blocked}
      </Button>
      <Button
        width="max"
        view="outlined-utility"
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('INVALID')}
        selected={activeStatus === 'INVALID'}
      >
        <Icon data={CircleExclamation} />
        Неисправно: {invalid}
      </Button>
      <Button
        width="max"
        view="outlined"
        pin="brick-circle"
        size="m"
        onClick={() => handleStatusClick('SKIPPED')}
        selected={activeStatus === 'SKIPPED'}
      >
        <Icon data={CircleChevronsRight} />
        Пропущено: {skipped}
      </Button>
    </div>
    <div>
      <TestResultsByFeature testResults={testResults} filter={activeStatus} />
    </div>
  </>;
};
