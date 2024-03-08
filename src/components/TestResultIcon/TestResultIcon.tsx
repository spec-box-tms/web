import { STATUS_ICON } from '@/helpers/testStatusIcons';
import { STATUS_DESCRIPTION } from '@/helpers/testStatusTexts';
import { TestResultStatus } from '@/types';
import { Xmark } from '@gravity-ui/icons';
import { Tooltip } from '@gravity-ui/uikit';
import { FC } from 'react';

interface TestResultIconProps {
  status?: TestResultStatus;
}

export const TestResultIcon: FC<TestResultIconProps> = (props) => {
  const { status } = props;

  if (!status) return <Tooltip content="На момент запуска утверждение отсутствовало">
    <span>
      <Xmark />
    </span>
  </Tooltip>;

  return <Tooltip content={STATUS_DESCRIPTION[status]}>
    <span>
      {STATUS_ICON[status] || null}
    </span>
  </Tooltip>;
};
