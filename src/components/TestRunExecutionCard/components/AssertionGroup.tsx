import { AssertionGroup as AssertionGroupData, TestResult } from '@/types';
import { FC } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import { Assertion } from './Assertion';
import './AssertionGroup.css';

interface AssertionGroupProps {
  assertionGroup: AssertionGroupData;
  testResults: TestResult[];
}
export const AssertionGroup: FC<AssertionGroupProps> = (props) => {
  const { assertionGroup, testResults } = props;

  const assertions = assertionGroup.assertions.map(assertion => {
    const filteredTestResults = testResults.filter(
      (testResult) => testResult.assertionTitle === assertion.title
    );

    return <Assertion key={assertion.title} assertion={assertion} testResult={filteredTestResults[0]} />;
  });

  return <div className={bem('AssertionGroup')}>
    <div className={bem('AssertionGroupTitle')}>
      {assertionGroup.title}
    </div>
    <div>
      {assertions}
    </div>
  </div>;
};
