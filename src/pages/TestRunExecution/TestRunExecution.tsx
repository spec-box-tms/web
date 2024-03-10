import { InfiniteLoader } from '@/components/InfiniteLoader/InfiniteLoader';
import { ProjectLayout } from '@/components/ProjectLayout/ProjectLayout';
import { ProjectTree } from '@/components/ProjectTree/ProejctTree';
import { QuestionDialog } from '@/components/QuestionDialog/QuestionDialog';
import { TestRunExecutionCard } from '@/components/TestRunExecutionCard/TestRunExecutionCard';
import { TestRunProgress } from '@/components/TestRunProgress/TestRunProgress';
import { TestRunStateIcon } from '@/components/TestRunStateIcon/TestRunStateIcon';
import { formatDate } from '@/helpers/formatDate';
import { useTitle } from '@/hooks/useTitle';
import * as projectModel from '@/model/pages/project';
import * as model from '@/model/pages/testRunExecution';
import { Feature, TestResult } from '@/types';
import { cn } from '@bem-react/classname';
import { Check } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { useEvent, useStore } from 'effector-react/scope';
import { FC, useCallback, useState } from 'react';
import './TestRunExecution.css';
import { TestRunExecutionContext } from '@/components/TestRunExecutionContext/TestRunExecutionContext';

const bem = cn('TestRunExecution');

interface DetailsProps {
  feature: Feature | null;
  isPending: boolean;
  testResults: TestResult[];
  repositoryUrl?: string;
}
const Details: FC<DetailsProps> = (props) => {
  const { feature, isPending, testResults, repositoryUrl } = props;

  if (!feature) {
    return <div>ничего не выбрано</div>;
  }
  if (isPending) {
    return <InfiniteLoader />;
  }
  return <TestRunExecutionCard
    feature={feature}
    testResults={testResults}
    repositoyUrl={repositoryUrl}
  />;
};

export const TestRunExecution: FC = () => {
  const { project, testRun } = useStore(model.$testRun);
  const isLoading = useStore(model.$testRunIsLoading);
  const isTreesLoading = useStore(projectModel.$treesIsPending);

  const isTestResultsLoading = useStore(model.$testResultsIsLoading);
  const testResults = useStore(model.$testResults);

  const loadTree = useEvent(projectModel.loadTree);
  const selectedTree = useStore(model.$tree);

  const { tree } = useStore(projectModel.$structure);
  const isStructureLoading = useStore(projectModel.$structureIsPending);

  const loadFeature = useEvent(projectModel.loadFeature);
  const selectedFeatureCode = useStore(model.$featureCode);
  const feature = useStore(model.$feature);
  const isFeatureLoading = useStore(model.$featureIsLoading);

  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const completeTestRun = useEvent(model.completeTestRunFx);

  const handleCompleteOpenDialog = useCallback(() => {
    setConfirmCompleteOpen(true);
  }, [setConfirmCompleteOpen]);

  const handleAcceptComplete = useCallback(() => {
    setConfirmCompleteOpen(false);
    completeTestRun({ testRunId: testRun.id });
  }, [setConfirmCompleteOpen, completeTestRun, testRun]);

  const onFeatureSelected = useCallback((feature: string) => {
    loadFeature({ feature });
  }, [loadFeature]);

  const onTreeSelecetd = useCallback((tree: string) => {
    loadTree({ tree });
  }, [loadTree]);

  useTitle(isLoading ? 'Тестирование' : `${project.title} - ${testRun.title} - Тестирование`);

  const actions = testRun.completedAt === undefined ?
    <div className={bem('Actions')}>
      <Button
        view="action"
        onClick={handleCompleteOpenDialog}
      >
        <Icon size={24} data={Check} />
        Завершить
      </Button>
    </div> : null;

  return <ProjectLayout project={project.code}
    contentClassName={bem()}
    version={project.version}
    projectTitle={project.title}
    isLoading={isLoading}
  >
    <TestRunExecutionContext.Provider value={{ testRun, testResults }}>
      <div className={bem('ListPanel')}>
        <div className={bem('Header')}>
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
        {actions}
        <TestRunProgress testResults={testResults || []} isPending={isTestResultsLoading} />
        <ProjectTree
          isPending={isTreesLoading}
          isPendingStructure={isStructureLoading}
          onFeatureSelected={onFeatureSelected}
          onTreeSelected={onTreeSelecetd}
          selectedTree={selectedTree}
          selectedFeatureCode={selectedFeatureCode}
          tree={tree}
        />
      </div>
      <div className={bem('DetailsPanel')}>
        <Details
          feature={feature}
          isPending={isTestResultsLoading || isFeatureLoading}
          testResults={testResults || []}
          repositoryUrl={project.repositoryUrl}
        />
      </div>
      <QuestionDialog
        onAccept={handleAcceptComplete}
        onCancel={() => setConfirmCompleteOpen(false)}
        open={confirmCompleteOpen}
        title="Завершение тестового запуска"
        content="Вы уверены, что хотите завершить тестовый запуск?"
      />
    </TestRunExecutionContext.Provider>
  </ProjectLayout>;
};
