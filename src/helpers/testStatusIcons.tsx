import { TestResultStatus } from '@/types';
import {
  CircleCheckFill,
  CircleChevronsRight,
  CircleDashed,
  CircleExclamation,
  CircleMinusFill,
  CircleXmarkFill
} from '@gravity-ui/icons';
import { TEST_STATUS_COLORS } from './testStatusColors';

export const STATUS_ICON: Record<TestResultStatus, React.JSX.Element> = {
  NEW: <CircleDashed color={TEST_STATUS_COLORS['NEW']} />,
  PASSED: <CircleCheckFill color={TEST_STATUS_COLORS['PASSED']} />,
  FAILED: <CircleXmarkFill color={TEST_STATUS_COLORS['FAILED']} />,
  BLOCKED: <CircleMinusFill color={TEST_STATUS_COLORS['BLOCKED']} />,
  INVALID: <CircleExclamation color={TEST_STATUS_COLORS['INVALID']} />,
  SKIPPED: <CircleChevronsRight color={TEST_STATUS_COLORS['SKIPPED']} />,
};
