import * as model from '@/model/pages/testRunExecution';
import { TestResult, TestResultHistory as TestResultHistoryData } from '@/types';
import { useEvent } from 'effector-react/scope';
import { FC, useCallback, useEffect, useState } from 'react';
import { InfiniteLoader } from '../InfiniteLoader/InfiniteLoader';
import { Item } from './components/Item';
import './TestResultHistory.css';
import { bem } from './TestResultHistory.cn';

interface TestResultHistoryProps {
  testResult: TestResult;
}

export const TestResultHistory: FC<TestResultHistoryProps> = (props) => {
  const { testResult } = props;
  const [historyItems, setHistoryItems] = useState<TestResultHistoryData[] | null>(null);
  const loadTestResultHistory = useEvent(model.loadTestResultHistoryFx);

  const handleHistoryLoaded = useCallback((data: TestResultHistoryData[]) => {
    data.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
    setHistoryItems(data);
  }, [setHistoryItems]);

  useEffect(() => {
    loadTestResultHistory({
      testRunId: testResult.testRunId,
      testResultId: testResult.id
    }).then(handleHistoryLoaded);
  }, [testResult, handleHistoryLoaded, loadTestResultHistory]);


  if (historyItems === null) {
    return <InfiniteLoader />;
  }

  if(historyItems.length === 0) {
    return <>Отсутсвует история тестирования</>;
  }

  const items = historyItems.map((item) => (
    <Item key={item.id} testResultHistory={item} isActive={testResult.id === item.id} />
  ));

  return <div className={bem()}>
    {items}
  </div>;
};
