import { CreateTestRun, ProjectTestRuns, TestRun } from '@/types';
import { createRoute } from 'atomic-router';
import { createEvent, restore, sample } from 'effector';
import { StoreDependencies, createSpecBoxEffect } from '../scope';
import { mapProjectTestRuns, mapTestResult } from '@/mappers';

const STUB: ProjectTestRuns = {
  project: { code: '', title: '', version: '' },
  testRuns: [],
};

export const testRunsRoute = createRoute<{
  project?: string;
}>();

interface LoadTestRunsFxParams {
  project: string;
  version?: string;
}

export const loadTestRunsFx = createSpecBoxEffect(
  async (
    { project, version }: LoadTestRunsFxParams,
    deps: StoreDependencies
  ): Promise<ProjectTestRuns> => {
    try {
      const response = await deps.api.listTestRuns(project, { version });
      return mapProjectTestRuns(response);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const $testRuns = restore<ProjectTestRuns>(
  loadTestRunsFx.doneData,
  STUB
);
export const $testRunsIsLoading = loadTestRunsFx.pending;

export const selectTestRun = createEvent<TestRun | null>();
export const $selectedTestRun = restore<TestRun | null>(selectTestRun, null);

interface LoadTestResultsFxParams {
  testRunId: string;
}

export const loadTestResultsFx = createSpecBoxEffect(
  async ({ testRunId }: LoadTestResultsFxParams, deps: StoreDependencies) => {
    try {
      const response = await deps.api.listTestResults(testRunId);
      return response.map(mapTestResult);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
export const $testResults = restore(loadTestResultsFx.doneData, null);
export const $testResultsIsLoading = loadTestResultsFx.pending;


interface CreateTestRunFxParams {
  testRun: CreateTestRun;
  projectCode: string;
  version?: string;
}

export const createTestRun = createEvent<CreateTestRunFxParams>();
export const createTestRunFx = createSpecBoxEffect(
  async (
    { testRun, projectCode, version }: CreateTestRunFxParams,
    deps: StoreDependencies
  ) => {
    try {
      return await deps.api.createTestRun(projectCode, {
        version,
        body: testRun,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
export const $createTestRunIsPending = createTestRunFx.pending;

sample({
  clock: createTestRunFx.done,
  source: $testRuns,
  fn: ({ project: { code, version } }) => ({ project: code, version }),
  target: loadTestRunsFx,
});

sample({
  clock: [testRunsRoute.opened],
  fn: ({ params: { project = '' }, query: { version } }) => ({
    project,
    version,
  }),
  target: loadTestRunsFx,
});

sample({
  source: createTestRun,
  target: createTestRunFx,
});

sample({
  source: $selectedTestRun,
  filter: (testRun) => testRun !== null,
  fn: (testRun) => ({ testRunId: testRun!.id }),
  target: loadTestResultsFx,
});
