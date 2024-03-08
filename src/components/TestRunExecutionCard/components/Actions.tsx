import { TestResult, TestResultStatus, UpdateTestResult } from '@/types';
import { CircleCheckFill, CircleChevronsRight, CircleExclamation, CircleMinusFill, CircleXmarkFill } from '@gravity-ui/icons';
import { Button, ButtonView, Icon, Modal, TextArea } from '@gravity-ui/uikit';
import { FC, useCallback, useEffect, useState } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import './Actions.css';
import { formatInterval } from '@/helpers/formatInterval';
import { ReportDialog, ReportDialogResult } from './ReportDialog';
import { STATUS_ACTIONS } from '@/helpers/testStatusTexts';

const STRICT_REPORT_STATUS = new Set<TestResultStatus>(['FAILED', 'BLOCKED', 'INVALID']);

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

  const [editTestResult, setEditTestResult] = useState<UpdateTestResult>({ id: testResult.id, status: testResult.status, report: testResult.report });
  const editStatus = editTestResult.status;

  const [selectedStatus, setSelectedStatus] = useState<TestResultStatus>(testResult.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editTestResult.status === testResult.status && editTestResult.report === testResult.report) {
      return;
    }

    const timer = setTimeout(() => {
      onTestResultChange(editTestResult);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [editTestResult, testResult, onTestResultChange]);


  const handleStatusClick = useCallback((status: TestResultStatus) => {
    if (status === editStatus) {
      return;
    }
    setSelectedStatus(status);

    if (STRICT_REPORT_STATUS.has(status) && !editTestResult.report) {
      setIsModalOpen(true);
      return;
    }

    setEditTestResult((prevTestResult) => ({
      ...prevTestResult,
      status,
    }));
  }, [setEditTestResult, setIsModalOpen, editStatus, editTestResult, setSelectedStatus]);

  const handleReportChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTestResult((prevTestResult) => ({
      ...prevTestResult,
      report: e.target.value,
    }));
  }, [setEditTestResult]);

  const handleReportModalAccept = useCallback(({ report }: ReportDialogResult) => {
    setEditTestResult((prevTestResult) => ({
      ...prevTestResult,
      status: selectedStatus,
      report,
    }));
    setIsModalOpen(false);
  }, [setEditTestResult, selectedStatus]);

  const report = editStatus !== 'NEW' ?
    <div className={bem('Report')}>
      <TextArea minRows={1} maxRows={20} value={editTestResult.report} onChange={handleReportChange} />
    </div> : null;
  const duration = testResult.duration ? <span>Длительность: {formatInterval(testResult.duration)}</span> : null;
  return <div className={bem('ActionsContainer')}>
    <div className={bem('Actions')}>
      <Button
        className={bem('ActionButton', getActiveClass('PASSED', editStatus))}
        view={getButtonView('PASSED', editStatus, 'outlined-success')}
        pin="circle-brick"
        size="m"
        onClick={() => handleStatusClick('PASSED')}
        selected={editStatus === 'PASSED'}
      >
        <Icon data={CircleCheckFill} />
        {STATUS_ACTIONS['PASSED']}
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('FAILED', editStatus))}
        view={getButtonView('FAILED', editStatus, 'outlined-danger')}
        pin="brick-brick"
        size="m" onClick={() => handleStatusClick('FAILED')}
        selected={editStatus === 'FAILED'}
      >
        <Icon data={CircleXmarkFill} />
        {STATUS_ACTIONS['FAILED']}
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('BLOCKED', editStatus))}
        view={getButtonView('BLOCKED', editStatus, 'outlined-warning')}
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('BLOCKED')}
        selected={editStatus === 'BLOCKED'}
        >
        <Icon data={CircleMinusFill} />
        {STATUS_ACTIONS['BLOCKED']}
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('INVALID', editStatus))}
        view={getButtonView('INVALID', editStatus, 'outlined-utility')}
        pin="brick-brick"
        size="m"
        onClick={() => handleStatusClick('INVALID')}
        selected={editStatus === 'INVALID'}
        >
        <Icon data={CircleExclamation} />
        {STATUS_ACTIONS['INVALID']}
      </Button>
      <Button
        className={bem('ActionButton', getActiveClass('SKIPPED', editStatus))}
        view={getButtonView('SKIPPED', editStatus, 'outlined')}
        pin="brick-circle"
        size="m"
        onClick={() => handleStatusClick('SKIPPED')}
        selected={editStatus === 'SKIPPED'}
        >
        <Icon data={CircleChevronsRight} />
        {STATUS_ACTIONS['SKIPPED']}
      </Button>
    </div>
    {report}
    <div className={bem('ActionInfo')}>
      {duration}
    </div>
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ReportDialog newStatus={selectedStatus} testResult={testResult} onAccept={handleReportModalAccept} />
    </Modal>
  </div>;
};
