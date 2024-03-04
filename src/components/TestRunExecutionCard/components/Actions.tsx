import { TestResult, TestResultStatus, UpdateTestResult } from '@/types';
import { CircleCheckFill, CircleChevronsRight, CircleExclamation, CircleMinusFill, CircleXmarkFill } from '@gravity-ui/icons';
import { Button, ButtonView, Icon, TextArea } from '@gravity-ui/uikit';
import { FC, useCallback, useEffect, useState } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import './Actions.css';
import { formatInterval } from '@/helpers/formatInterval';

const getButtonView = (status: TestResultStatus, activeStatus: TestResultStatus, activeView: ButtonView) => {
  return status === activeStatus ? activeView : 'outlined';
};

const getActiveClass = (status: TestResultStatus, activeStatus: TestResultStatus) => {
  return status === activeStatus ? 'Active' : '';
};

interface ActionsProps {
  testResult: TestResult;
  onTestResultChange: (updateTestResult: UpdateTestResult) => void;
}

export const Actions: FC<ActionsProps> = (props) => {
  const { testResult, onTestResultChange } = props;

  const [activeTestResult, setActiveTestResult] = useState<UpdateTestResult>({ id: testResult.id, status: testResult.status, report: testResult.report });

  useEffect(() => {
    if (activeTestResult.status === testResult.status && activeTestResult.report === testResult.report) {
      return;
    }

    const timer = setTimeout(() => {
      onTestResultChange(activeTestResult);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [activeTestResult, testResult, onTestResultChange]);

  const activeStatus = activeTestResult.status;

  const handleStatusClick = useCallback((status: TestResultStatus) => {
    setActiveTestResult((prevTestResult) => ({
      ...prevTestResult,
      status,
    }));
  }, [setActiveTestResult]);

  const handleReportChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveTestResult((prevTestResult) => ({
      ...prevTestResult,
      report: e.target.value,
    }));
  }, [setActiveTestResult]);

  const report = activeStatus !== 'NEW' ?
    <div className={bem('Report')}>
      <TextArea minRows={1} maxRows={20} value={activeTestResult.report} onChange={handleReportChange} />
    </div> : null;
  const duration = testResult.duration ? <span>Длительность: {formatInterval(testResult.duration)}</span> : null;
  return <div className={bem('ActionsContainer')}>
    <div className={bem('Actions')}>
      <Button
        className={bem('ActionButton', getActiveClass('PASSED', activeStatus))}
        view={getButtonView('PASSED', activeStatus, 'outlined-success')}
        pin="circle-brick"
        size="m"
        onClick={() => handleStatusClick('PASSED')}
        selected={activeStatus === 'PASSED'}
      >
        <Icon data={CircleCheckFill} />
        Пройден
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('FAILED', activeStatus))}
        view={getButtonView('FAILED', activeStatus, 'outlined-danger')}
        pin="brick-brick"
        size="m" onClick={() => handleStatusClick('FAILED')}
        selected={activeStatus === 'FAILED'}
      >
        <Icon data={CircleXmarkFill} />
        Провален
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('BLOCKED', activeStatus))}
        view={getButtonView('BLOCKED', activeStatus, 'outlined-warning')}
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('BLOCKED')}
        selected={activeStatus === 'BLOCKED'}
      >
        <Icon data={CircleMinusFill} />
        Заблокирован
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('INVALID', activeStatus))}
        view={getButtonView('INVALID', activeStatus, 'outlined-utility')}
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('INVALID')}
        selected={activeStatus === 'INVALID'}
      >
        <Icon data={CircleExclamation} />
        Неисправен
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('SKIPPED', activeStatus))}
        view={getButtonView('SKIPPED', activeStatus, 'outlined')}
        pin="brick-circle"
        size="m"
        onClick={() => handleStatusClick('SKIPPED')}
        selected={activeStatus === 'SKIPPED'}
      >
        <Icon data={CircleChevronsRight} />
        Пропущен
      </Button>
    </div>
    {report}
    <div className={bem('ActionInfo')}>
    {duration}
    </div>
  </div>;
};
