import { TEST_STATUS_COLORS } from '@/helpers/testStatusColors';
import { TestResult } from '@/types';
import { Progress, ProgressSize } from '@gravity-ui/uikit';
import { FC } from 'react';

function toPercent(value: number, total: number): number {
  return value / total * 100;
}

interface TestRunProgressProps {
  testResults: TestResult[];
  size?: ProgressSize;
  isPending?: boolean;
}

export const TestRunProgress: FC<TestRunProgressProps> = (props) => {
  const { testResults, size, isPending } = props;

  if (isPending) {
    return <div style={{ fontSize: '.8em' }}>
      <Progress
        size={size || 'm'}
        stack={[
          { color: TEST_STATUS_COLORS['NEW'], value: 100, content: '...', loading: true }
        ]}
      />
    </div>;
  }

  const total = testResults.length;
  const notstarted = testResults.filter((r) => r.status === 'NEW').length;
  const passed = testResults.filter((r) => r.status === 'PASSED').length;
  const failed = testResults.filter((r) => r.status === 'FAILED').length;
  const blocked = testResults.filter((r) => r.status === 'BLOCKED').length;
  const invalid = testResults.filter((r) => r.status === 'INVALID').length;
  const skipped = testResults.filter((r) => r.status === 'SKIPPED').length;

  return <div style={{ fontSize: '.8em' }}>
    <Progress size={size || 'm'} stack={[
      { color: TEST_STATUS_COLORS['NEW'], value: toPercent(notstarted, total), content: notstarted },
      { color: TEST_STATUS_COLORS['PASSED'], value: toPercent(passed, total), content: passed },
      { color: TEST_STATUS_COLORS['FAILED'], value: toPercent(failed, total), content: failed },
      { color: TEST_STATUS_COLORS['BLOCKED'], value: toPercent(blocked, total), content: blocked },
      { color: TEST_STATUS_COLORS['INVALID'], value: toPercent(invalid, total), content: invalid },
      { color: TEST_STATUS_COLORS['SKIPPED'], value: toPercent(skipped, total), content: skipped }
    ]} />
  </div>;
};
