import { ProjectTestRuns, TestRun } from '@/types';
import { createRoute } from 'atomic-router';
import { createEvent, restore, sample } from 'effector';
import {
  CreateTestRunParams,
  createTestRunQuery,
  loadTestResultsQuery,
  loadTestRunsQuery
} from '../queries';
import { createSpecBoxEffect } from '../scope';

const STUB: ProjectTestRuns = {
  project: { code: '', title: '', version: '' },
  testRuns: [],
};

export const testRunsRoute = createRoute<{
  project?: string;
}>();

export const loadTestRunsFx = createSpecBoxEffect(loadTestRunsQuery);
export const $testRuns = restore<ProjectTestRuns>(
  loadTestRunsFx.doneData,
  STUB
);
export const $testRunsIsLoading = loadTestRunsFx.pending;

export const selectTestRun = createEvent<TestRun | null>();
export const $selectedTestRun = restore<TestRun | null>(selectTestRun, null);

export const loadTestResultsFx = createSpecBoxEffect(loadTestResultsQuery);
export const $testResults = restore(loadTestResultsFx.doneData, null);
export const $testResultsIsLoading = loadTestResultsFx.pending;

export const createTestRun = createEvent<CreateTestRunParams>();
export const createTestRunFx = createSpecBoxEffect(createTestRunQuery);
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
