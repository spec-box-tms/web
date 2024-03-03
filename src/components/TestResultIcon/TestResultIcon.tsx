import { TestResultStatus } from '@/types';
import { FC } from 'react';
import {CircleDashed, CircleCheckFill, CircleXmarkFill, CircleMinusFill, CircleExclamation, CircleChevronsRight} from '@gravity-ui/icons';
import { TEST_STATUS_COLORS } from '@/helpers/testStatusColors';

const STATUS_TO_ICON: Record<TestResultStatus, React.JSX.Element> = {
  NEW: <CircleDashed color={TEST_STATUS_COLORS['NEW']} />,
  PASSED: <CircleCheckFill color={TEST_STATUS_COLORS['PASSED']}/>,
  FAILED: <CircleXmarkFill color={TEST_STATUS_COLORS['FAILED']} />,
  BLOCKED: <CircleMinusFill color={TEST_STATUS_COLORS['BLOCKED']} />,
  INVALID: <CircleExclamation color={TEST_STATUS_COLORS['INVALID']} />,
  SKIPPED: <CircleChevronsRight color={TEST_STATUS_COLORS['SKIPPED']}/>,
};

interface TestResultIconProps {
  status: TestResultStatus;
}

export const TestResultIcon: FC<TestResultIconProps> = (props) => {
  const { status } = props;
  
  return STATUS_TO_ICON[status] || null;
};
