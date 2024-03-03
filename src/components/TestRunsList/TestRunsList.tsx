import { FC } from 'react';
import { Item } from './components/Item';
import { bem } from './TestRunsList.cn';
import { TestRun } from '@/types';
import './TestRunsList.css';

interface TestRunsListProps {
  testRuns: TestRun[];
}

export const TestRunsList: FC<TestRunsListProps> = (props) => {
  const { testRuns } = props;

  if (testRuns.length === 0) {
    return <div>Нет тестовых прогонов</div>;
  }

  const testRunsSorted = testRuns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const items = testRunsSorted.map((testRun) => <Item key={testRun.id} testRun={testRun} />);

  return <div className={bem()}>{items}</div>;
};
