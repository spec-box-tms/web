import { TestResultStatus } from '@/types';

export const TEST_STATUS_COLORS: Record<TestResultStatus, string> = {
  NEW: 'rgb(140, 191, 221)',
  PASSED: 'rgb(45, 139, 93)',
  FAILED: 'rgb(189, 9, 53)',
  BLOCKED: 'rgb(220, 160, 10)',
  INVALID: 'rgb(121, 71, 170)',
  SKIPPED: 'rgb(166, 166, 166)',
};
