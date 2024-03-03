import {
  GetAutotestsStatResponse,
  SpecBoxWebApiModelCommonProjectModel,
  SpecBoxWebApiModelCommonProjectVersionModel,
  SpecBoxWebApiModelProjectAssertionGroupModel,
  SpecBoxWebApiModelProjectAssertionModel,
  SpecBoxWebApiModelProjectFeatureModel,
  SpecBoxWebApiModelProjectStructureModel,
  SpecBoxWebApiModelProjectTreeModel,
  SpecBoxWebApiModelProjectTreeNodeModel,
  SpecBoxWebApiModelTestRunModel,
  SpecBoxWebApiModelTestRunProjectTestRunsModel,
  SpecBoxWebApiModelTestRunTestResultModel,
} from './api';
import {
  Assertion,
  AssertionGroup,
  Feature,
  Project,
  ProjectDetails,
  ProjectStat,
  ProjectStructure,
  ProjectTestRuns,
  TestResult,
  TestResultStatus,
  TestRun,
  Tree,
  TreeNode,
} from './types';

export const mapFeature = (
  input: SpecBoxWebApiModelProjectFeatureModel
): Feature => {
  const { code, title, description, filePath } = input;

  const assertionGroups = input.assertionGroups.map(mapAssertionGroup);
  const allAssertions = new Array<Assertion>().concat(
    ...assertionGroups.map((gr) => gr.assertions)
  );

  const total = allAssertions.length;
  const automated = allAssertions.filter((a) => a.isAutomated).length;

  return {
    code,
    title,
    description,
    filePath,
    assertionGroups,
    assertionsCount: {
      total,
      automated,
    },
  };
};

export const mapAssertionGroup = (
  input: SpecBoxWebApiModelProjectAssertionGroupModel
): AssertionGroup => {
  const { title, assertions } = input;

  return {
    title,
    assertions: assertions.map(mapAssertion),
  };
};

export const mapAssertion = (
  input: SpecBoxWebApiModelProjectAssertionModel
): Assertion => {
  const { title, description, isAutomated } = input;

  return { title, description, isAutomated };
};

export const mapProject = (
  project: SpecBoxWebApiModelCommonProjectModel
): Project => {
  const { code, title, description, repositoryUrl, versions } = project;

  return { code, title, description, repositoryUrl, versions };
};

export const mapProjectDetails = (
  project: SpecBoxWebApiModelCommonProjectVersionModel
): ProjectDetails => {
  const { code, title, description, repositoryUrl, version } = project;

  return { code, title, description, repositoryUrl, version };
};

export const mapStructure = ({
  tree,
  project,
}: SpecBoxWebApiModelProjectStructureModel): ProjectStructure => {
  return {
    project: mapProjectDetails(project),
    tree: tree.map(mapTreeNode),
  };
};

function mapTreeNode(node: SpecBoxWebApiModelProjectTreeNodeModel): TreeNode {
  const {
    totalCount,
    automatedCount,
    id,
    title,
    featureCode,
    parentId,
    sortOrder,
  } = node;

  if (featureCode) {
    return {
      type: 'feature',
      totalCount,
      automatedCount,
      id,
      title,
      featureCode,
      parentId,
      sortOrder,
    };
  }

  return {
    type: 'group',
    totalCount,
    automatedCount,
    id,
    title,
    parentId,
    sortOrder,
  };
}

export function mapProjectStat(stat: GetAutotestsStatResponse): ProjectStat {
  const assertions = stat.assertions.map(
    ({ automatedCount, totalCount, timestamp }) => ({
      automatedCount,
      totalCount,
      timestamp,
    })
  );

  const autotests = stat.autotests.map(({ timestamp, assertionsCount }) => ({
    assertionsCount,
    timestamp,
  }));

  return {
    project: mapProjectDetails(stat.project),
    assertions,
    autotests,
  };
}

export function mapTree(tree: SpecBoxWebApiModelProjectTreeModel): Tree {
  const { code, title } = tree;

  return { code, title };
}

export function mapTestRun(testRun: SpecBoxWebApiModelTestRunModel): TestRun {
  const {
    id,
    title,
    projectCode,
    createdAt,
    startedAt,
    completedAt,
    description,
    version,
  } = testRun;

  return {
    id,
    title,
    projectCode,
    createdAt,
    startedAt,
    completedAt,
    description,
    version,
  };
}

export function mapProjectTestRuns(
  projectTestRuns: SpecBoxWebApiModelTestRunProjectTestRunsModel
): ProjectTestRuns {
  const { project, testRuns } = projectTestRuns;
  return {
    project: mapProjectDetails(project),
    testRuns: testRuns.map(mapTestRun),
  };
}

export function mapTestResult(
  testResult: SpecBoxWebApiModelTestRunTestResultModel
): TestResult {
  const {
    id,
    status,
    report,
    completedAt,
    assertionTitle,
    assertionGroupTitle,
    featureCode,
    featureTitle,
  } = testResult;

  return {
    id,
    status: status as TestResultStatus,
    report,
    completedAt,
    assertionTitle,
    assertionGroupTitle,
    featureCode,
    featureTitle,
  };
}
