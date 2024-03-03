import { TestResultStatus } from '@/types';
import { FC } from 'react';
import {CircleDashed, CircleCheckFill, CircleXmarkFill, CircleMinusFill, CircleExclamation, CircleChevronsRight} from '@gravity-ui/icons';

const STATUS_TO_ICON: Record<TestResultStatus, React.JSX.Element> = {
  NEW: <CircleDashed color="gray" />,
  PASSED: <CircleCheckFill color="rgb(50, 186, 118)"/>,
  FAILED: <CircleXmarkFill color="rgb(255, 0, 61)" />,
  BLOCKED: <CircleMinusFill color="rgb(255, 190, 92)" />,
  INVALID: <CircleExclamation color="rgb(121, 71, 170)" />,
  SKIPPED: <CircleChevronsRight color="gray"/>,
}

interface TestResultIconProps {
  status: TestResultStatus;
}

export const TestResultIcon: FC<TestResultIconProps> = (props) => {
  const { status } = props;
  
  return STATUS_TO_ICON[status] || null;
}
