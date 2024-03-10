import { TestResult, TestRun } from '@/types';
import { createContext } from 'react';


export interface TestRunExecutionContextValue {
  testRun: TestRun;
  testResults: TestResult[] | null;
}

export const TestRunExecutionContext = createContext<TestRunExecutionContextValue | undefined>(undefined);
