import { FormattedText } from '@/components/FormattedText/FormattedText';
import { TestRunProgress } from '@/components/TestRunProgress/TestRunProgress';
import { TestResult, TestResultStatus } from '@/types';
import { ArrowToggle } from '@gravity-ui/uikit';
import { FC, useCallback, useState } from 'react';
import { bem } from '../TestRunDetail.cn';
import './TestResultsByFeature.css';
import { TestResultIcon } from '@/components/TestResultIcon/TestResultIcon';


interface FeatureTestResults {
  featureCode: string;
  featureTitle: string;
  visible: boolean;
  testResults: TestResult[];
}

const report = (report?: string) => {
  if (!report) {
    return null;
  }
  return <div className={bem('Report')}>
    <FormattedText text={report} />
  </div>;
};

interface TestResultFeatureBlockProps {
  feature: FeatureTestResults,
  onExpanderClick: (featureCode: string) => void,
  isExpanded: boolean
}

const TestResultFeatureBlock: FC<TestResultFeatureBlockProps> = (props) => {
  const { feature, onExpanderClick, isExpanded } = props;
  const assertionGroups = new Map<string, TestResult[]>();
  for (const testResult of feature.testResults) {
    const group = assertionGroups.get(testResult.assertionGroupTitle) ?? [];
    group.push(testResult);
    assertionGroups.set(testResult.assertionGroupTitle, group);
  }

  const assertionGroupBlocks = Array.from(assertionGroups.entries()).map(([groupTitle, testResults]) => {
    return <div className={bem('Group')} key={groupTitle}>
      <div className={bem('GroupTitle')}>
        {groupTitle}
      </div>
      <div className={bem('AssertList')}>
        {testResults.map((testResult) => {
          return <div key={testResult.id} className={bem('Assertion')}>
            <div>
              <TestResultIcon status={testResult.status} />
            </div>
            <div>
              <FormattedText text={testResult.assertionTitle} />
              {report(testResult.report)}
            </div>
          </div>;
        })}
      </div>
    </div>;
  });

  return <div className={bem('FeatureBlock')}>
    <div className={bem('FeatureHeader')}>
      <div className={bem('FeatureTitle')}>
        <div className={bem('Expander')} onClick={() => onExpanderClick(feature.featureCode)}>
          <ArrowToggle direction={isExpanded ? 'bottom' : 'right'}></ArrowToggle>
        </div>
        {feature.featureTitle}
      </div>
      <div className={bem('FeatureProgress')}>
        <TestRunProgress testResults={feature.testResults} />
      </div>
    </div>
    {isExpanded && assertionGroupBlocks}
  </div>;
};

interface TestResultsByFeatureProps {
  testResults: TestResult[];
  filter?: TestResultStatus;
}

export const TestResultsByFeature: FC<TestResultsByFeatureProps> = (props) => {
  const { testResults, filter } = props;
  const testResultsGroupedByFeatureCode = new Map<string, FeatureTestResults>();
  const [expandedFeature, setExpandedFeature] = useState<string | undefined>();
  const toggleExpanded = useCallback((featureCode: string) => {
    if (featureCode === expandedFeature) {
      setExpandedFeature(undefined);
    } else {
      setExpandedFeature(featureCode);
    }
  }, [setExpandedFeature, expandedFeature]);

  for (const testResult of testResults) {
    const { featureCode, featureTitle } = testResult;
    const feature = testResultsGroupedByFeatureCode.get(featureCode) ?? { featureCode, featureTitle, visible: !filter, testResults: [] };
    feature.testResults.push(testResult);
    if (filter && testResult.status === filter) {
      feature.visible ||= true;
    }
    testResultsGroupedByFeatureCode.set(featureCode, feature);
  }

  const filteredFeatures = Array.from(testResultsGroupedByFeatureCode.values()).filter((feature) => feature.visible);

  return <div>
    {filteredFeatures.map((feature) => {
      return <TestResultFeatureBlock
        key={feature.featureCode}
        feature={feature}
        onExpanderClick={toggleExpanded}
        isExpanded={feature.featureCode === expandedFeature}
      />;
    })}
  </div>;
};
