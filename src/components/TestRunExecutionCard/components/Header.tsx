import { CopyFeatureCodeButton } from '@/components/CopyFeatureCodeButton/CopyFeatureCodeButton';
import { GoToYamlButton } from '@/components/GoToYamlButton/GoToYamlButton';
import { TestRunProgress } from '@/components/TestRunProgress/TestRunProgress';
import { Feature, TestResult } from '@/types';
import { FC } from 'react';
import { bem } from '../TestRunExecutionCard.cn';
import './Header.css';

interface HeaderProps {
  feature: Feature;
  repositoryUrl?: string;
  testResults: TestResult[];
}

export const Header: FC<HeaderProps> = (props) => {
  const { feature, testResults, repositoryUrl } = props;

  return <div className={bem('Header')}>
    <TestRunProgress testResults={testResults} />
    <div className={bem('Title')}>
      {feature.title}
    </div>
    <div className={bem('Actions')}>
      <CopyFeatureCodeButton code={feature.code} />
      <GoToYamlButton filePath={feature.filePath} repositoryUrl={repositoryUrl} />
    </div>
  </div>;
};
