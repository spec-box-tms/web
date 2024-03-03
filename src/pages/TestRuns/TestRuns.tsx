import { ProjectLayout } from '@/components/ProjectLayout/ProjectLayout';
import { FC, useCallback, useState } from 'react';
import * as model from '@/model/pages/testRuns';
import { useEvent, useStore } from 'effector-react/scope';
import { cn } from '@bem-react/classname';

import './TestRuns.css';
import { InfiniteLoader } from '@/components/InfiniteLoader/InfiniteLoader';
import { TestRunsList } from '@/components/TestRunsList/TestRunsList';
import { Button, Modal } from '@gravity-ui/uikit';
import { CreateTestRun, TestRun } from '@/types';
import { CreateTestRunForm } from '@/components/CreateTestRunForm/CreateTestRunForm';
import { TestRunDetails } from '@/components/TestRunDetails/TestRunDetails';

const bem = cn('TestRuns');

interface TestRunsPanelProps {
  project: string;
  version?: string;
  testRuns: TestRun[];
  isLoading: boolean;
}

export const TestRunsPanel: FC<TestRunsPanelProps> = (props) => {
  const { testRuns, isLoading, project, version } = props;
  const [open, setOpen] = useState(false);
  const createTestRun = useEvent(model.createTestRun);

  const handleCreateTestRun = useCallback((testRun: CreateTestRun) => {
    createTestRun({ testRun, projectCode: project, version });
    setOpen(false);
  }, [createTestRun, project, version]);

  if (isLoading) {
    return <InfiniteLoader />;
  }

  return <>
    <Button
      size="m"
      className={bem('Button')}
      onClick={() => setOpen(true)}
    >
      Создать тестовый прогон
    </Button>
    <TestRunsList testRuns={testRuns} />
    <Modal open={open} onClose={() => setOpen(false)}>
      <CreateTestRunForm onCreateTestRun={handleCreateTestRun} />
    </Modal>
  </>;
};

export const TestRuns: FC = () => {
  const { project, testRuns } = useStore(model.$testRuns);
  const isLoading = useStore(model.$testRunsIsLoading);
  const selectedTestRun = useStore(model.$selectedTestRun);

  const testRunDetails = selectedTestRun ?
    <TestRunDetails/> :
    <div>ничего не выбрано</div>;

  return <ProjectLayout
    contentClassName={bem()}
    project={project.code}
    version={project.version}
    projectTitle={project.title}
  >
    <div className={bem('ListPanel')}>
      <TestRunsPanel testRuns={testRuns} isLoading={isLoading} project={project.code} version={project.version} />
    </div>
    <div className={bem('DetailsPanel')}>
      {testRunDetails}
    </div>
  </ProjectLayout>;
};
