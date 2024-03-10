import { FormattedText } from '@/components/FormattedText/FormattedText';
import { TestResultIcon } from '@/components/TestResultIcon/TestResultIcon';
import * as model from '@/model/pages/testRunExecution';
import { Assertion as AssertionData, TestResult, UpdateTestResult } from '@/types';
import { FaceRobot, Hand } from '@gravity-ui/icons';
import { Icon, Tooltip } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback, useContext } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import { Actions } from './Actions';
import './Assertion.css';
import { TestRunExecutionContext } from '@/components/TestRunExecutionContext/TestRunExecutionContext';

interface AssertionProps {
  assertion: AssertionData;
  testResult?: TestResult;
}
export const Assertion: FC<AssertionProps> = (props) => {
  const { assertion, testResult } = props;
  const testRunExecutionContext = useContext(TestRunExecutionContext);

  const readonly = !testRunExecutionContext || testRunExecutionContext.testRun.completedAt !== undefined;

  const updateTestResult = useEvent(model.updateTestResult);

  const handleTestResultChange = useCallback((updatedTestResult: UpdateTestResult) => {
    updateTestResult(updatedTestResult);
  }, [updateTestResult]);

  const descrition = assertion.description ?
    <div className={bem('AssertionDescription')}>
      <FormattedText text={assertion.description} />
    </div> : null;

  const automationIcon = assertion.isAutomated ?
    <Tooltip content="Тест автоматизаирован">
      <Icon data={FaceRobot} />
    </Tooltip>
    :
    <Tooltip content="Ручное тестирование">
      <Icon data={Hand} />
    </Tooltip>;

  const readonlyReport = readonly && testResult && testResult.report ?
    <div className={bem('Report')}>
      <div className={bem('ReportTitle')}>
        Отчет о тестировании:
      </div>
      <FormattedText text={testResult.report} />
    </div>
    : null;

  const actions = testResult && !readonly ? <Actions testResult={testResult} onTestResultChange={handleTestResultChange} /> : null;

  return (
    <div className={bem('Assertion')}>
      <div className={bem('StatusIcon')}>
        <TestResultIcon status={testResult?.status} />
        {automationIcon}
      </div>
      <div className={bem('AssertionContent')}>
        <FormattedText text={assertion.title} />
        {descrition}
        {actions}
        {readonlyReport}
      </div>
    </div>
  );
};
