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
import { useTitle } from '@/hooks/useTitle';

const bem = cn('TestRuns');

interface TestRunsPanelProps {
  project: string;
  version?: string;
  testRuns: TestRun[];
  isLoading: boolean;
  configurations: string[];
  environments: string[];
}

export const TestRunsPanel: FC<TestRunsPanelProps> = (props) => {
  const { testRuns, isLoading, project, version, configurations, environments } = props;
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
      view="action"
      className={bem('Button')}
      onClick={() => setOpen(true)}
    >
      Создать тестовый запуск
    </Button>
    <TestRunsList testRuns={testRuns}/>
    <Modal open={open} onClose={() => setOpen(false)}>
      <CreateTestRunForm
        onCreateTestRun={handleCreateTestRun}
        configurations={configurations}
        environments={environments}
      />
    </Modal>
  </>;
};

export const TestRuns: FC = () => {
  const { project, testRuns, configurations } = useStore(model.$testRuns);
  const isLoading = useStore(model.$testRunsIsLoading);
  const selectedTestRun = useStore(model.$selectedTestRun);

  useTitle(isLoading ? 'Тестовые запуски' : `${project.title} - Тестовые запуски`);

  const testRunDetails = selectedTestRun ?
    <TestRunDetails /> :
    <div>ничего не выбрано</div>;

  return <ProjectLayout
    contentClassName={bem()}
    project={project.code}
    version={project.version}
    projectTitle={project.title}
  >
    <div className={bem('ListPanel')}>
      <TestRunsPanel
        testRuns={testRuns}
        isLoading={isLoading}
        project={project.code}
        version={project.version}
        configurations={configurations.configurations}
        environments={configurations.environments}
      />
    </div>
    <div className={bem('DetailsPanel')}>
      {testRunDetails}
    </div>
  </ProjectLayout>;
};
