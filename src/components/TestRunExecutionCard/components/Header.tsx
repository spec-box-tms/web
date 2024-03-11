import { CopyFeatureCodeButton } from '@/components/CopyFeatureCodeButton/CopyFeatureCodeButton';
import { GoToYamlButton } from '@/components/GoToYamlButton/GoToYamlButton';
import { TestRunProgress } from '@/components/TestRunProgress/TestRunProgress';
import { Feature, TestResult } from '@/types';
import { FC } from 'react';
import { bem as parentBem } from '../TestRunExecutionCard.cn';
import './Header.css';
import { OpenGraphButton } from '@/components/OpenGraphButton/OpenGraphButton';
import { useEvent, useStore } from 'effector-react/scope';
import * as model from '@/model/pages/testRunExecution';
import * as projectModel from '@/model/pages/project';
import { cn } from '@bem-react/classname';
import { CopyFeatureMarkdownButton } from '@/components/CopyFeatureMarkdownButton/CopyFeatureMarkdownButton';

const bem = cn(parentBem('Header'));

interface HeaderProps {
  feature: Feature;
  repositoryUrl?: string;
  testResults: TestResult[];
}

export const Header: FC<HeaderProps> = (props) => {
  const { feature, testResults, repositoryUrl } = props;

  const featureRelations = useStore(model.$featureRelations);
  const selectFeature = useEvent(projectModel.loadFeature);

  const handleGraphFeatureSelected = (feature: string) => {
    selectFeature({ feature });
  };

  return <div className={bem('Header')}>
    <TestRunProgress testResults={testResults} />
    <div className={bem('Title')}>
      {feature.title}
    </div>
    <div className={bem('Actions')}>
      <CopyFeatureCodeButton code={feature.code} />
      <GoToYamlButton filePath={feature.filePath} repositoryUrl={repositoryUrl} />
      <CopyFeatureMarkdownButton feature={feature} />
      <OpenGraphButton data={featureRelations} onFeatureSelected={handleGraphFeatureSelected}/>
    </div>
  </div>;
};
