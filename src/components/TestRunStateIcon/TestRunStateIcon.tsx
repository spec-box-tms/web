import { TestRun } from '@/types';
import { CircleCheckFill, CircleDashed, Clock } from '@gravity-ui/icons';
import { FC } from 'react';

interface TestRunStateIconProps {
  testRun: TestRun;
  size?: number;
}

export const TestRunStateIcon: FC<TestRunStateIconProps> = (props) => {
  const { testRun, size = 16 } = props;
  
  if (testRun.completedAt) {
    return <CircleCheckFill height={size} width={size} color="rgb(50, 186, 118)" />;
  }
  if (testRun.startedAt) {
    return <Clock height={size} width={size} color="rgb(48, 114, 179)" />;
  }

  return <CircleDashed height={size} width={size} color="gray" />;
};
