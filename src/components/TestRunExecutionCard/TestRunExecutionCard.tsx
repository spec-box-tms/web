import { Feature, TestResult } from '@/types';
import { FC } from 'react';
import { Header } from './components/Header';
import { AssertionGroup } from './components/AssertionGroup';
import { bem } from './TestRunExecutionCard.cn';
import './TestRunExecutionCard.css';
import { FormattedText } from '../FormattedText/FormattedText';

interface TestRunExecutionDetailProps {
  feature: Feature;
  testResults: TestResult[];
  repositoyUrl?: string;
}

export const TestRunExecutionCard: FC<TestRunExecutionDetailProps> = (props) => {
  const { feature, testResults, repositoyUrl } = props;

  const featureTestResults = testResults.filter((testResult) => testResult.featureCode === feature.code);

  const description = feature.description ?
    <div>
      <FormattedText text={feature.description} />
    </div> : null;

  const assertionGroups = feature.assertionGroups.map((group, index) => {
    const groupTestResults = featureTestResults.filter(testResult => testResult.assertionGroupTitle === group.title);
    return <AssertionGroup key={index} assertionGroup={group} testResults={groupTestResults} />;
  });


  return <div className={bem()}>
    <Header feature={feature} testResults={featureTestResults} repositoryUrl={repositoyUrl} />
    {description}
    {assertionGroups}
  </div>;
};
