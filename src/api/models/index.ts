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
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly assertions: SpecBoxWebApiModelProjectAssertionModel[];
}

export interface SpecBoxWebApiModelProjectAssertionModel {
  title: string;
  description?: string;
  isAutomated: boolean;
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

/** Optional parameters. */
export interface ConfigOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the config operation. */
export type ConfigResponse = SpecBoxWebApiModelDefaultConfigurationModel;

/** Optional parameters. */
export interface ExportUploadProjectOptionalParams
  extends coreClient.OperationOptions {
  body?: SpecBoxWebApiModelUploadData;
  version?: string;
}

/** Optional parameters. */
export interface ProjectsOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the projects operation. */
export type ProjectsResponse = SpecBoxWebApiModelCommonProjectModel[];

/** Optional parameters. */
export interface ProjectsProjectFeaturesFeatureOptionalParams
  extends coreClient.OperationOptions {
  version?: string;
}

/** Contains response data for the projectsProjectFeaturesFeature operation. */
export type ProjectsProjectFeaturesFeatureResponse =
  SpecBoxWebApiModelProjectFeatureModel;

/** Optional parameters. */
export interface ProjectsProjectStructuresPlainOptionalParams
  extends coreClient.OperationOptions {
  version?: string;
}

/** Contains response data for the projectsProjectStructuresPlain operation. */
export type ProjectsProjectStructuresPlainResponse =
  SpecBoxWebApiModelProjectStructureModel;

/** Optional parameters. */
export interface ProjectsProjectStructuresOptionalParams
  extends coreClient.OperationOptions {
  version?: string;
}

/** Contains response data for the projectsProjectStructures operation. */
export type ProjectsProjectStructuresResponse =
  SpecBoxWebApiModelProjectTreeModel[];

/** Optional parameters. */
export interface ProjectsProjectStructuresTreeCodeOptionalParams
  extends coreClient.OperationOptions {
  version?: string;
}

/** Contains response data for the projectsProjectStructuresTreeCode operation. */
export type ProjectsProjectStructuresTreeCodeResponse =
  SpecBoxWebApiModelProjectStructureModel;

/** Optional parameters. */
export interface StatUploadAutotestsOptionalParams
  extends coreClient.OperationOptions {
  version?: string;
  body?: SpecBoxWebApiModelStatAutotestsStatUploadData;
  project?: string;
}

/** Optional parameters. */
export interface StatOptionalParams extends coreClient.OperationOptions {
  version?: string;
  project?: string;
  from?: Date;
  to?: Date;
}

/** Contains response data for the stat operation. */
export type StatResponse = SpecBoxWebApiModelStatModel;

/** Optional parameters. */
export interface SpecBoxWebApiOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
