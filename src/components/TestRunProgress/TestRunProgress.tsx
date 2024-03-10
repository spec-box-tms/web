import { TEST_STATUS_COLORS } from '@/helpers/testStatusColors';
import { TestResult, TestRun } from '@/types';
import { Progress, ProgressSize } from '@gravity-ui/uikit';
import { FC } from 'react';

function toPercent(value: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return value / total * 100;
}

const testRunToStats = (testRun: TestRun): TestRunStats => ({
  total: testRun.totalCount,
  notstarted: testRun.totalCount - testRun.passedCount - testRun.failedCount - testRun.blockedCount - testRun.invalidCount - testRun.skippedCount,
  passed: testRun.passedCount,
  failed: testRun.failedCount,
  blocked: testRun.blockedCount,
  invalid: testRun.invalidCount,
  skipped: testRun.skippedCount,
});

const testResultsToStats = (testResults: TestResult[]): TestRunStats => ({
  total: testResults.length,
  notstarted: testResults.filter((r) => r.status === 'NEW').length,
  passed: testResults.filter((r) => r.status === 'PASSED').length,
  failed: testResults.filter((r) => r.status === 'FAILED').length,
  blocked: testResults.filter((r) => r.status === 'BLOCKED').length,
  invalid: testResults.filter((r) => r.status === 'INVALID').length,
  skipped: testResults.filter((r) => r.status === 'SKIPPED').length,
});

interface TestRunStats {
  total: number;
  notstarted: number;
  passed: number;
  failed: number;
  blocked: number;
  invalid: number;
  skipped: number;
}

interface TestRunProgressProps {
  testResults?: TestResult[];
  testRun?: TestRun;
  size?: ProgressSize;
  isPending?: boolean;
}

export const TestRunProgress: FC<TestRunProgressProps> = (props) => {
  const { testResults, testRun, size, isPending } = props;

  if (isPending || (testResults === undefined && testRun === undefined)) {
    return <div style={{ fontSize: '.8em' }}>
      <Progress
        size={size || 'm'}
        stack={[
          { color: TEST_STATUS_COLORS['NEW'], value: 100, content: '...', loading: true }
        ]}
      />
    </div>;
  }

  let stats: TestRunStats | undefined = undefined;
  if(testRun !== undefined) {
    stats = testRunToStats(testRun);
  } else if(testResults !== undefined) {
    stats = testResultsToStats(testResults);
  } else {
    return null;
  }

  const renderSize = size || 'm';
  const renderValues = renderSize === 'm';

  return <div style={{ fontSize: '.8em' }}>
    <Progress size={renderSize} stack={[
      { color: TEST_STATUS_COLORS['NEW'], value: toPercent(stats.notstarted, stats.total), content: renderValues && stats.notstarted },
      { color: TEST_STATUS_COLORS['PASSED'], value: toPercent(stats.passed, stats.total), content: renderValues && stats.passed },
      { color: TEST_STATUS_COLORS['FAILED'], value: toPercent(stats.failed, stats.total), content: renderValues && stats.failed },
      { color: TEST_STATUS_COLORS['BLOCKED'], value: toPercent(stats.blocked, stats.total), content: renderValues && stats.blocked },
      { color: TEST_STATUS_COLORS['INVALID'], value: toPercent(stats.invalid, stats.total), content: renderValues && stats.invalid },
      { color: TEST_STATUS_COLORS['SKIPPED'], value: toPercent(stats.skipped, stats.total), content: renderValues && stats.skipped }
    ]} />
  </div>;
};
