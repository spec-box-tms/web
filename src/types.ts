import { EdgeStyle, NodeStyle } from '@antv/graphin';

export interface Feature {
  code: string;
  title: string;
  description?: string;
  filePath?: string;
  assertionGroups: AssertionGroup[];
  assertionsCount: {
    total: number;
    automated: number;
  };
}

export interface AssertionGroup {
  title: string;
  assertions: Assertion[];
  order: number;
}

export interface Assertion {
  title: string;
  description?: string;
  isAutomated: boolean;
  order: number;
}

export interface BaseTreeNode {
  id: string;
  parentId?: string;
  title?: string;
  totalCount: number;
  automatedCount: number;
  sortOrder?: number;
}

export interface FeatureTreeNode extends BaseTreeNode {
  type: 'feature';
  featureCode: string;
}

export interface GroupTreeNode extends BaseTreeNode {
  type: 'group';
}

export type TreeNode = GroupTreeNode | FeatureTreeNode;

export interface ProjectStructure {
  project: ProjectDetails;
  tree: TreeNode[];
}

export interface ProjectDetails {
  code: string;
  title: string;
  description?: string;
  repositoryUrl?: string;
  version?: string;
}

export interface Version {
  version?: string;
  updatedAt?: Date;
}

export interface Project extends Omit<ProjectDetails, 'version'> {
  versions: Version[];
}

export interface StatAssertion {
  timestamp: Date;
  totalCount: number;
  automatedCount: number;
}

export interface StatAutotestsItem {
  timestamp: Date;
  assertionsCount: number;
}

export interface ProjectStat {
  project: ProjectDetails;
  assertions: StatAssertion[];
  autotests: StatAutotestsItem[];
}

export interface Tree {
  code: string;
  title: string;
}

export interface TestRun {
  id: string;
  title: string;
  description?: string;
  projectCode: string;
  version?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface ProjectTestRuns {
  project: ProjectDetails;
  testRuns: TestRun[];
}

export interface CreateTestRun {
  title: string;
  description?: string;
}

export type TestResultStatus =
  | 'NEW'
  | 'PASSED'
  | 'SKIPPED'
  | 'FAILED'
  | 'BLOCKED'
  | 'INVALID';

export interface TestResult {
  id: string;
  testRunId: string;
  status: TestResultStatus;
  report?: string;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
  assertionTitle: string;
  assertionGroupTitle: string;
  featureCode: string;
  featureTitle: string;
}

export interface UpdateTestResult {
  id: string;
  status: TestResultStatus;
  report?: string;
}

export interface TestRunDetails {
  project: ProjectDetails;
  testRun: TestRun;
}

export interface TestResultHistory {
  id: string;
  testRunId: string;
  testRunTitle: string;
  version?: string;
  status: TestResultStatus;
  report?: string;
  completedAt: Date;
}

export type FeatureRelationNodeTypes = 'feature' | 'attribute-value';
export interface FeatureRelationNode {
  id: string;
  title: string;
  code: string;
  nodeType: FeatureRelationNodeTypes;
  style?: Partial<NodeStyle>;
}

export interface FeatureRelationEdge {
  source: string;
  target: string;
  style?: Partial<EdgeStyle>;
}

export interface FeatureRelations {
  nodes: FeatureRelationNode[];
  edges: FeatureRelationEdge[];
}
