import { TestResult } from '@/types';
import { Progress, ProgressSize } from '@gravity-ui/uikit';
import { FC } from 'react';

function toPercent(value: number, total: number): number {
  return value / total * 100;
}

interface TestRunProgressProps {
  testResults: TestResult[];
  size?: ProgressSize;
}

export const TestRunProgress: FC<TestRunProgressProps> = (props) => {
  const { testResults, size } = props;
  const total = testResults.length;
  const notstarted = testResults.filter((r) => r.status === 'NEW').length;
  const passed = testResults.filter((r) => r.status === 'PASSED').length;
  const failed = testResults.filter((r) => r.status === 'FAILED').length;
  const blocked = testResults.filter((r) => r.status === 'BLOCKED').length;
  const invalid = testResults.filter((r) => r.status === 'INVALID').length;
  const skipped = testResults.filter((r) => r.status === 'SKIPPED').length;
  
  return <div style={{fontSize: '.8em'}}>
    <Progress size={size || 'm'} stack={[
      { theme: 'info', value: toPercent(notstarted, total), content: notstarted },
      { color: 'rgb(50, 186, 118)', value: toPercent(passed, total), content: passed },
      { color: 'rgb(255, 0, 61)', value: toPercent(failed, total), content: failed },
      { color: 'rgb(255, 190, 92)', value: toPercent(blocked, total), content: blocked },
      { color: 'rgb(121, 71, 170)', value: toPercent(invalid, total), content: invalid },
      { theme: 'default', value: toPercent(skipped, total), content: skipped }
    ]} />
  </div>;
};
