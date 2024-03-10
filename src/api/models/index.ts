import * as coreClient from '@azure/core-client';

export interface SpecBoxWebApiModelDefaultConfigurationModel {
  metrikaCounterId?: string;
}

export interface SpecBoxWebApiModelUploadData {
  features: SpecBoxWebApiModelUploadFeatureModel[];
  attributes: SpecBoxWebApiModelUploadAttributeModel[];
  trees: SpecBoxWebApiModelUploadTreeModel[];
  project: SpecBoxWebApiModelUploadProjectModel;
}

export interface SpecBoxWebApiModelUploadFeatureModel {
  code: string;
  title: string;
  description?: string;
  filePath?: string;
  groups: SpecBoxWebApiModelUploadAssertionGroupModel[];
  /** Dictionary of <components·1i2d5w·schemas·specbox-webapi-model-upload-featuremodel·properties·attributes·additionalproperties> */
  attributes?: { [propertyName: string]: string[] | null };
}

export interface SpecBoxWebApiModelUploadAssertionGroupModel {
  title: string;
  assertions: SpecBoxWebApiModelUploadAssertionModel[];
}

export interface SpecBoxWebApiModelUploadAssertionModel {
  title: string;
  description?: string;
  isAutomated: boolean;
}

export interface SpecBoxWebApiModelUploadAttributeModel {
  code: string;
  title: string;
  values: SpecBoxWebApiModelUploadAttributeValueModel[];
}

export interface SpecBoxWebApiModelUploadAttributeValueModel {
  code: string;
  title: string;
}

export interface SpecBoxWebApiModelUploadTreeModel {
  code: string;
  title: string;
  attributes: string[];
}

export interface SpecBoxWebApiModelUploadProjectModel {
  title?: string;
  description?: string;
  repositoryUrl?: string;
}

export interface MicrosoftAspNetCoreMvcProblemDetails {
  /** Describes unknown properties. The value of an unknown property can be of "any" type. */
  [property: string]: any;
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export interface SpecBoxWebApiModelCommonProjectModel {
  code: string;
  title: string;
  description?: string;
  repositoryUrl?: string;
  versions: SpecBoxWebApiModelCommonVersionModel[];
}

export interface SpecBoxWebApiModelCommonVersionModel {
  version?: string;
  updatedAt?: Date;
}

export interface SpecBoxWebApiModelProjectFeatureModel {
  code: string;
  title: string;
  description?: string;
  filePath?: string;
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly assertionGroups: SpecBoxWebApiModelProjectAssertionGroupModel[];
}

export interface SpecBoxWebApiModelProjectAssertionGroupModel {
  title: string;
  order: number;
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly assertions: SpecBoxWebApiModelProjectAssertionModel[];
}

export interface SpecBoxWebApiModelProjectAssertionModel {
  title: string;
  description?: string;
  order: number;
  isAutomated: boolean;
}

export interface SpecBoxWebApiModelProjectStructureModel {
  project: SpecBoxWebApiModelCommonProjectVersionModel;
  tree: SpecBoxWebApiModelProjectTreeNodeModel[];
}

export interface SpecBoxWebApiModelCommonProjectVersionModel {
  code: string;
  title: string;
  description?: string;
  repositoryUrl?: string;
  version?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SpecBoxWebApiModelProjectTreeNodeModel {
  id: string;
  parentId?: string;
  featureCode?: string;
  title?: string;
  totalCount: number;
  automatedCount: number;
  sortOrder?: number;
}

export interface SpecBoxWebApiModelProjectTreeModel {
  code: string;
  title: string;
}

export interface SpecBoxWebApiModelProjectFeatureRelationsModel {
  nodes: SpecBoxWebApiModelProjectGraphNodeModel[];
  edges: SpecBoxWebApiModelProjectGraphEdgeModel[];
}

export interface SpecBoxWebApiModelProjectGraphNodeModel {
  id: string;
  title: string;
}

export interface SpecBoxWebApiModelProjectGraphEdgeModel {
  source: string;
  target: string;
}

export interface SpecBoxWebApiModelStatAutotestsStatUploadData {
  timestamp: Date;
  duration: number;
  assertionsCount: number;
}

export interface SpecBoxWebApiModelStatModel {
  project: SpecBoxWebApiModelCommonProjectVersionModel;
  assertions: SpecBoxWebApiModelStatAssertionsStatModel[];
  autotests: SpecBoxWebApiModelStatAutotestsStatModel[];
}

export interface SpecBoxWebApiModelStatAssertionsStatModel {
  timestamp: Date;
  totalCount: number;
  automatedCount: number;
}

export interface SpecBoxWebApiModelStatAutotestsStatModel {
  timestamp: Date;
  duration: number;
  assertionsCount: number;
}

export interface SpecBoxWebApiModelTestRunCreateTestRunModel {
  title: string;
  description?: string;
  environment?: string;
  configuration?: string;
}

export interface SpecBoxWebApiModelTestRunProjectTestRunsModel {
  project: SpecBoxWebApiModelCommonProjectVersionModel;
  testRuns: SpecBoxWebApiModelTestRunModel[];
  configurations: SpecBoxWebApiModelTestRunConfigurationsModel;
}

export interface SpecBoxWebApiModelTestRunModel {
  id: string;
  title: string;
  description?: string;
  projectCode: string;
  version?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  totalCount: number;
  passedCount: number;
  failedCount: number;
  blockedCount: number;
  invalidCount: number;
  skippedCount: number;
  environment?: string;
  configuration?: string;
}

export interface SpecBoxWebApiModelTestRunConfigurationsModel {
  configurations: string[];
  environments: string[];
}

export interface SpecBoxWebApiModelTestRunDetailsModel {
  project: SpecBoxWebApiModelCommonProjectVersionModel;
  testRun: SpecBoxWebApiModelTestRunModel;
}

export interface SpecBoxWebApiModelTestRunTestResultModel {
  id: string;
  testRunId: string;
  status: string;
  report?: string;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  assertionTitle: string;
  assertionGroupTitle: string;
  featureCode: string;
  featureTitle: string;
}

export interface SpecBoxWebApiModelTestRunUpdateTestResultModel {
  status: string;
  report?: string;
  updatedAt?: Date;
}

export interface SpecBoxWebApiModelTestRunTestResultHistoryModel {
  id: string;
  testRunId: string;
  testRunTitle: string;
  version?: string;
  status: string;
  report?: string;
  completedAt: Date;
}

/** Optional parameters. */
export interface DefaultOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the default operation. */
export type DefaultResponse = SpecBoxWebApiModelDefaultConfigurationModel;

/** Optional parameters. */
export interface ExportOptionalParams extends coreClient.OperationOptions {
  /** Data to be upladed */
  body?: SpecBoxWebApiModelUploadData;
  /** Optional project version */
  version?: string;
}

/** Contains response data for the export operation. */
export type ExportResponse = MicrosoftAspNetCoreMvcProblemDetails;

/** Optional parameters. */
export interface ListProjectsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listProjects operation. */
export type ListProjectsResponse = SpecBoxWebApiModelCommonProjectModel[];

/** Optional parameters. */
export interface GetFeatureOptionalParams extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the getFeature operation. */
export type GetFeatureResponse = SpecBoxWebApiModelProjectFeatureModel;

/** Optional parameters. */
export interface GetStructurePlainOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the getStructurePlain operation. */
export type GetStructurePlainResponse = SpecBoxWebApiModelProjectStructureModel;

/** Optional parameters. */
export interface ListStructuresOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the listStructures operation. */
export type ListStructuresResponse = SpecBoxWebApiModelProjectTreeModel[];

/** Optional parameters. */
export interface GetStructureOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the getStructure operation. */
export type GetStructureResponse = SpecBoxWebApiModelProjectStructureModel;

/** Optional parameters. */
export interface GetFeatureRelationsOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the getFeatureRelations operation. */
export type GetFeatureRelationsResponse =
  SpecBoxWebApiModelProjectFeatureRelationsModel;

/** Optional parameters. */
export interface AutotestsStatUploadOptionalParams
  extends coreClient.OperationOptions {
  /** Optional project version */
  version?: string;
  body?: SpecBoxWebApiModelStatAutotestsStatUploadData;
  project?: string;
}

/** Optional parameters. */
export interface GetAutotestsStatOptionalParams
  extends coreClient.OperationOptions {
  /** Optional project version */
  version?: string;
  project?: string;
  from?: Date;
  to?: Date;
}

/** Contains response data for the getAutotestsStat operation. */
export type GetAutotestsStatResponse = SpecBoxWebApiModelStatModel;

/** Optional parameters. */
export interface CreateTestRunOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
  /** The object containing the test run data. */
  body?: SpecBoxWebApiModelTestRunCreateTestRunModel;
}

/** Contains response data for the createTestRun operation. */
export type CreateTestRunResponse = MicrosoftAspNetCoreMvcProblemDetails;

/** Optional parameters. */
export interface ListTestRunsOptionalParams
  extends coreClient.OperationOptions {
  /** The project version. Default version if not provided. */
  version?: string;
}

/** Contains response data for the listTestRuns operation. */
export type ListTestRunsResponse =
  SpecBoxWebApiModelTestRunProjectTestRunsModel;

/** Optional parameters. */
export interface GetTestRunOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the getTestRun operation. */
export type GetTestRunResponse = SpecBoxWebApiModelTestRunDetailsModel;

/** Optional parameters. */
export interface ListTestResultsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listTestResults operation. */
export type ListTestResultsResponse =
  SpecBoxWebApiModelTestRunTestResultModel[];

/** Optional parameters. */
export interface GetTestResultOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getTestResult operation. */
export type GetTestResultResponse = SpecBoxWebApiModelTestRunTestResultModel;

/** Optional parameters. */
export interface UpdateTestResultOptionalParams
  extends coreClient.OperationOptions {
  /** The data to update the test result with. */
  body?: SpecBoxWebApiModelTestRunUpdateTestResultModel;
}

/** Contains response data for the updateTestResult operation. */
export type UpdateTestResultResponse = SpecBoxWebApiModelTestRunTestResultModel;

/** Optional parameters. */
export interface GetTestResultHistoryOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getTestResultHistory operation. */
export type GetTestResultHistoryResponse =
  SpecBoxWebApiModelTestRunTestResultHistoryModel[];

/** Optional parameters. */
export interface SpecBoxWebApiOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
