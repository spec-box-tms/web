import { TestRunDetails, UpdateTestResult } from '@/types';
import { createRoute, querySync } from 'atomic-router';
import { combine, createEvent, createStore, restore, sample } from 'effector';
import { controls } from '../common';
import {
  loadFeatureQuery,
  loadTestResultHistoryQuery,
  loadTestResultsQuery,
  loadTestRunQuery,
  updateTestResultQuery,
} from '../queries';
import { createSpecBoxEffect } from '../scope';
import { loadFeature, loadStructureFx, loadTree, loadTreesFx, $feature as $projectFeature } from './project';

const STUB: TestRunDetails = {
  project: { code: '', title: '', version: '' },
  testRun: { id: '', title: '', projectCode: '', createdAt: new Date() },
};

export const testRunExecutionRoute = createRoute<{
  project?: string;
  testrun?: string;
}>();

export const loadTestRunFx = createSpecBoxEffect(loadTestRunQuery);
export const $testRun = restore<TestRunDetails>(loadTestRunFx.doneData, STUB);
export const $testRunIsLoading = loadTestRunFx.pending;

export const loadTestRunResultsFx = createSpecBoxEffect(loadTestResultsQuery);
export const $testResults = restore(loadTestRunResultsFx.doneData, null);
export const $testResultsIsLoading = loadTestRunResultsFx.pending;

export const loadFeatureFx = createSpecBoxEffect(loadFeatureQuery);
export const $feature = restore(loadFeatureFx.doneData, null);
export const $featureIsLoading = loadFeatureFx.pending;

export const updateTestResult = createEvent<UpdateTestResult>();
const updateTestResultFx = createSpecBoxEffect(updateTestResultQuery);

export const loadTestResultHistoryFx = createSpecBoxEffect(loadTestResultHistoryQuery);

export const $tree = createStore<string | null>(null).on(
  [testRunExecutionRoute.opened, testRunExecutionRoute.updated],
  (_, { query: { tree } }) => tree ?? null
);
export const $featureCode = createStore<string>('').on(
  [testRunExecutionRoute.opened, testRunExecutionRoute.updated],
  (_, { query: { feature } }) => feature
);

sample({
  clock: [testRunExecutionRoute.opened],
  fn: ({ params: { testrun = '' } }) => ({
    testRunId: testrun,
  }),
  target: loadTestRunFx,
});

sample({
  clock: [testRunExecutionRoute.opened],
  fn: ({ params: { testrun = '' } }) => ({
    testRunId: testrun,
  }),
  target: loadTestRunResultsFx,
});

sample({
  clock: [$testRun],
  fn: ({ project: { code, version } }) => ({
    project: code,
    version: version || null,
  }),
  target: loadTreesFx,
});

sample({
  clock: [$featureCode, $testRun],
  source: combine({
    feature: $featureCode,
    testRun: $testRun,
  }),
  filter: ({ testRun, feature }) => Boolean(testRun.project.code) && Boolean(feature),
  fn: ({
    feature,
    testRun: {
      project: { code: project, version },
    },
  }) => ({ feature, project, version }),
  target: loadFeatureFx,
});

sample({
  clock: [$tree, $testRun],
  source: combine({
    tree: $tree,
    testRun: $testRun,
  }),
  filter: ({ testRun }) => Boolean(testRun.project.code),
  fn: ({
    tree,
    testRun: {
      project: { code: project, version },
    },
  }) => ({ project, version: version || null, tree: tree || null }),
  target: loadStructureFx,
});

querySync({
  source: {
    tree: restore(
      loadTree.map(({ tree }) => tree),
      null
    ),
  },
  route: testRunExecutionRoute,
  controls,
});

querySync({
  source: {
    feature: restore(
      loadFeature.map(({ feature }) => feature),
      null
    ),
  },
  route: testRunExecutionRoute,
  controls,
});

sample({
  clock: [updateTestResult],
  source: $testRun,
  fn: (testRun, updateTestResult) => ({
    testRunId: testRun.testRun.id,
    ...updateTestResult,
  }), 
  target: updateTestResultFx,
});

sample({
  clock: [updateTestResultFx.doneData],
  source: $testResults,
  fn: (testResults, updatedTestResult) => {
    if (!testResults) return null;
    return testResults.map((testResult) => {
      if (testResult.id === updatedTestResult.id) {
        return updatedTestResult;
      }
      return testResult;
    });
  },
  target: $testResults,
});

// To expand tree on load
sample({
  clock: loadFeatureFx.doneData,
  target: $projectFeature,
});
