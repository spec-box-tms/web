import {
  CreateTestRun,
  Feature,
  FeatureRelations,
  ProjectStructure,
  ProjectTestRuns,
  TestResult,
  TestResultHistory,
  TestRunDetails,
  Tree,
} from '@/types';
import { StoreDependencies } from './scope';
import {
  mapFeature,
  mapFeatureRelations,
  mapProjectTestRuns,
  mapStructure,
  mapTestResult,
  mapTestResultHistory,
  mapTestRunDetails,
  mapTree,
} from '@/mappers';

interface LoadTestRunParams {
  testRunId: string;
}
export async function loadTestRunQuery(
  { testRunId }: LoadTestRunParams,
  deps: StoreDependencies
): Promise<TestRunDetails> {
  try {
    const response = await deps.api.getTestRun(testRunId);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface LoadTestRunsParams {
  project: string;
  version?: string;
}
export async function loadTestRunsQuery(
  { project, version }: LoadTestRunsParams,
  deps: StoreDependencies
): Promise<ProjectTestRuns> {
  try {
    const response = await deps.api.listTestRuns(project, { version });
    return mapProjectTestRuns(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface LoadTestResultsParams {
  testRunId: string;
}
export async function loadTestResultsQuery(
  { testRunId }: LoadTestResultsParams,
  deps: StoreDependencies
): Promise<TestResult[]> {
  try {
    const response = await deps.api.listTestResults(testRunId);
    return response.map(mapTestResult);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export interface CreateTestRunParams {
  testRun: CreateTestRun;
  projectCode: string;
  version?: string;
}
export async function createTestRunQuery(
  { testRun, projectCode, version }: CreateTestRunParams,
  deps: StoreDependencies
): Promise<void> {
  try {
    await deps.api.createTestRun(projectCode, {
      version,
      body: testRun,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export interface LoadTreesParams {
  project: string;
  version: string | null;
}
export async function loadTreesQuery(
  { project, version }: LoadTreesParams,
  deps: StoreDependencies
): Promise<Tree[]> {
  try {
    const response = await deps.api.listStructures(project, {
      version: version ?? undefined,
    });

    return response.map(mapTree);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export interface LoadStructureParams {
  project: string;
  version: string | null;
  tree: string | null;
}
export async function loadStructureQuery(
  { project, version, tree }: LoadStructureParams,
  deps: StoreDependencies
): Promise<ProjectStructure> {
  try {
    if (tree === null) {
      const response = await deps.api.getStructurePlain(project, {
        version: version ?? undefined,
      });
      return mapStructure(response);
    } else {
      const response = await deps.api.getStructure(project, tree, {
        version: version ?? undefined,
      });
      return mapStructure(response);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export interface LoadFeatureParams {
  project: string;
  version?: string;
  feature: string;
}
export async function loadFeatureQuery(
  { project, version, feature }: LoadFeatureParams,
  deps: StoreDependencies
): Promise<Feature> {
  try {
    const response = await deps.api.getFeature(project, feature, { version });
    return mapFeature(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface UpdateTestResultParams {
  testRunId: string;
  id: string;
  status: string;
  report?: string;
}
export async function updateTestResultQuery(
  { testRunId, id, status, report }: UpdateTestResultParams,
  deps: StoreDependencies
): Promise<TestResult> {
  try {
    const response = await deps.api.updateTestResult(testRunId, id, { body: { status, report }});
    return mapTestResult(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface LoadTestResultHistoryParams {
  testRunId: string;
  testResultId: string;
}
export async function loadTestResultHistoryQuery(
  { testRunId, testResultId }: LoadTestResultHistoryParams,
  deps: StoreDependencies
): Promise<TestResultHistory[]> {
  try {
    const response = await deps.api.getTestResultHistory(testRunId, testResultId);
    return response.map(mapTestResultHistory);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface LoadFeatureRelationsParams {
  project: string;
  version?: string;
}
export async function LoadFeatureRelationsQuery(
  { project, version }: LoadFeatureRelationsParams,
  deps: StoreDependencies
): Promise<FeatureRelations> {
  try {
    const response = await deps.api.getFeatureRelations(project, { version });
    return mapFeatureRelations(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

interface CompleteTestRunParams {
  testRunId: string;
}
export async function completeTestRunQuery(
  { testRunId }: CompleteTestRunParams,
  deps: StoreDependencies
): Promise<TestRunDetails> {
  try {
    const response = await deps.api.completeTestRun(testRunId);
    return mapTestRunDetails(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
