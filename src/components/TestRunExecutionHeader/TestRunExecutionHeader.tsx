import { formatDate } from '@/helpers/formatDate';
import * as model from '@/model/pages/testRunExecution';
import { TestRun } from '@/types';
import { cn } from '@bem-react/classname';
import { Check, TrashBin } from '@gravity-ui/icons';
import { Alert, Button, Icon } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback, useState } from 'react';
import { QuestionDialog } from '../QuestionDialog/QuestionDialog';
import { TestRunStateIcon } from '../TestRunStateIcon/TestRunStateIcon';
import './TestRunExecutionHeader.css';
import { testRunsRoute } from '@/model';

const bem = cn('TestRunExecution-Header');

interface TestRunExecutionHeaderProps {
  testRun: TestRun;
}

export const TestRunExecutionHeader: FC<TestRunExecutionHeaderProps> = (props) => {
  const { testRun } = props;
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const completeTestRun = useEvent(model.completeTestRunFx);
  const deleteTestRun = useEvent(model.deleteTestRunFx);
  const navigateToTestRun = useEvent(testRunsRoute.navigate);

  const handleAcceptComplete = useCallback(() => {
    setConfirmCompleteOpen(false);
    completeTestRun({ testRunId: testRun.id });
  }, [setConfirmCompleteOpen, completeTestRun, testRun]);

  const handleAcceptDelete = useCallback(() => {
    setConfirmDeleteOpen(false);
    deleteTestRun({ testRunId: testRun.id });
    navigateToTestRun({ params: { project: testRun.projectCode }, query: { version: testRun.version } });
  }, [setConfirmDeleteOpen, deleteTestRun, navigateToTestRun, testRun]);

  const completeButton = testRun.completedAt === undefined ? <Button
    view="action"
    onClick={() => setConfirmCompleteOpen(true)}
  >
    <Icon data={Check} /> Завершить
  </Button> : null;

  return <>
    <div className={bem()}>
      <TestRunStateIcon size={24} testRun={testRun} />
      <div className={bem('Title')}>
        <div>
          {testRun.title}
        </div>
        <div className={bem('Subtitle')}>
          {formatDate(testRun.createdAt)}
          {testRun.completedAt && ' - ' + formatDate(testRun.completedAt)}
        </div>
      </div>
    </div>
    <div className={bem('Actions')}>
      <Button
        view="outlined-danger"
        onClick={() => setConfirmDeleteOpen(true)}
      >
        <Icon data={TrashBin} /> Удалить
      </Button>
      {completeButton}
    </div>
    <QuestionDialog
      onAccept={handleAcceptComplete}
      onCancel={() => setConfirmCompleteOpen(false)}
      open={confirmCompleteOpen}
      title="Завершение тестового запуска"
    >
      <Alert
        theme="warning"
        title="Вы уверены, что хотите завершить тестовый запуск?"
        message="Все незавершенные тесты будут отмечены как пропущенные."
      />
    </QuestionDialog>
    <QuestionDialog
      onAccept={handleAcceptDelete}
      onCancel={() => setConfirmDeleteOpen(false)}
      open={confirmDeleteOpen}
      title="Удаление тестового запуска"
    >
      <Alert
        theme="danger"
        title="Вы уверены, что хотите удалить тестовый запуск?"
        message="Результаты тестового запуска будут удалены безвовзратно."
      />
    </QuestionDialog>
  </>;
};
