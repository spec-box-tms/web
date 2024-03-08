import { FormattedText } from '@/components/FormattedText/FormattedText';
import { TestResultIcon } from '@/components/TestResultIcon/TestResultIcon';
import * as model from '@/model/pages/testRunExecution';
import { Assertion as AssertionData, TestResult, UpdateTestResult } from '@/types';
import { FaceRobot, Hand } from '@gravity-ui/icons';
import { Icon, Tooltip } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import { Actions } from './Actions';
import './Assertion.css';

interface AssertionProps {
  assertion: AssertionData;
  testResult?: TestResult;
}
export const Assertion: FC<AssertionProps> = (props) => {
  const { assertion, testResult } = props;

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

  const actions = testResult ? <Actions testResult={testResult} onTestResultChange={handleTestResultChange} /> : null;

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
      </div>
    </div>
  );
};
