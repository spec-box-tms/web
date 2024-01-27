import * as coreClient from '@azure/core-client';
import * as Parameters from './models/parameters';
import * as Mappers from './models/mappers';
import {
  SpecBoxWebApiOptionalParams,
  ConfigOptionalParams,
  ConfigResponse,
  ExportUploadProjectOptionalParams,
  ProjectsOptionalParams,
  ProjectsResponse,
  ProjectsProjectFeaturesFeatureOptionalParams,
  ProjectsProjectFeaturesFeatureResponse,
  ProjectsProjectStructuresPlainOptionalParams,
  ProjectsProjectStructuresPlainResponse,
  ProjectsProjectStructuresOptionalParams,
  ProjectsProjectStructuresResponse,
  ProjectsProjectStructuresTreeCodeOptionalParams,
  ProjectsProjectStructuresTreeCodeResponse,
  StatUploadAutotestsOptionalParams,
  StatOptionalParams,
  StatResponse,
} from './models';

export class SpecBoxWebApi extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the SpecBoxWebApi class.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor($host: string, options?: SpecBoxWebApiOptionalParams) {
    if ($host === undefined) {
      throw new Error('\'$host\' cannot be null');
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: SpecBoxWebApiOptionalParams = {
      requestContentType: 'application/json; charset=utf-8',
    };

    const packageDetails = 'azsdk-js-specBoxWebApi/1.0.0-beta.1';
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? '{$host}',
    };
    super(optionsWithDefaults);
    // Parameter assignments
    this.$host = $host;
  }

  /** @param options The options parameters. */
  config(options?: ConfigOptionalParams): Promise<ConfigResponse> {
    return this.sendOperationRequest({ options }, configOperationSpec);
  }

  /**
   * @param project
   * @param options The options parameters.
   */
  exportUploadProject(
    project: string,
    options?: ExportUploadProjectOptionalParams,
  ): Promise<void> {
    return this.sendOperationRequest(
      { project, options },
      exportUploadProjectOperationSpec,
    );
  }

  /** @param options The options parameters. */
  projects(options?: ProjectsOptionalParams): Promise<ProjectsResponse> {
    return this.sendOperationRequest({ options }, projectsOperationSpec);
  }

  /**
   * @param project
   * @param feature
   * @param options The options parameters.
   */
  projectsProjectFeaturesFeature(
    project: string,
    feature: string,
    options?: ProjectsProjectFeaturesFeatureOptionalParams,
  ): Promise<ProjectsProjectFeaturesFeatureResponse> {
    return this.sendOperationRequest(
      { project, feature, options },
      projectsProjectFeaturesFeatureOperationSpec,
    );
  }

  /**
   * @param project
   * @param options The options parameters.
   */
  projectsProjectStructuresPlain(
    project: string,
    options?: ProjectsProjectStructuresPlainOptionalParams,
  ): Promise<ProjectsProjectStructuresPlainResponse> {
    return this.sendOperationRequest(
      { project, options },
      projectsProjectStructuresPlainOperationSpec,
    );
  }

  /**
   * @param project
   * @param options The options parameters.
   */
  projectsProjectStructures(
    project: string,
    options?: ProjectsProjectStructuresOptionalParams,
  ): Promise<ProjectsProjectStructuresResponse> {
    return this.sendOperationRequest(
      { project, options },
      projectsProjectStructuresOperationSpec,
    );
  }

  /**
   * @param project
   * @param treeCode
   * @param options The options parameters.
   */
  projectsProjectStructuresTreeCode(
    project: string,
    treeCode: string,
    options?: ProjectsProjectStructuresTreeCodeOptionalParams,
  ): Promise<ProjectsProjectStructuresTreeCodeResponse> {
    return this.sendOperationRequest(
      { project, treeCode, options },
      projectsProjectStructuresTreeCodeOperationSpec,
    );
  }

  /** @param options The options parameters. */
  statUploadAutotests(
    options?: StatUploadAutotestsOptionalParams,
  ): Promise<void> {
    return this.sendOperationRequest(
      { options },
      statUploadAutotestsOperationSpec,
    );
  }

  /** @param options The options parameters. */
  stat(options?: StatOptionalParams): Promise<StatResponse> {
    return this.sendOperationRequest({ options }, statOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const configOperationSpec: coreClient.OperationSpec = {
  path: '/config',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelDefaultConfigurationModel,
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const exportUploadProjectOperationSpec: coreClient.OperationSpec = {
  path: '/export/upload/{project}',
  httpMethod: 'POST',
  responses: { 200: {} },
  requestBody: Parameters.body,
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project],
  headerParameters: [Parameters.contentType],
  mediaType: 'json',
  serializer,
};
const projectsOperationSpec: coreClient.OperationSpec = {
  path: '/projects',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelCommonProjectModel',
            },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const projectsProjectFeaturesFeatureOperationSpec: coreClient.OperationSpec = {
  path: '/projects/{project}/features/{feature}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelProjectFeatureModel,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project, Parameters.feature],
  headerParameters: [Parameters.accept],
  serializer,
};
const projectsProjectStructuresPlainOperationSpec: coreClient.OperationSpec = {
  path: '/projects/{project}/structures:plain',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelProjectStructureModel,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project],
  headerParameters: [Parameters.accept],
  serializer,
};
const projectsProjectStructuresOperationSpec: coreClient.OperationSpec = {
  path: '/projects/{project}/structures',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelProjectTreeModel',
            },
          },
        },
      },
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project],
  headerParameters: [Parameters.accept],
  serializer,
};
const projectsProjectStructuresTreeCodeOperationSpec: coreClient.OperationSpec =
  {
    path: '/projects/{project}/structures/{treeCode}',
    httpMethod: 'GET',
    responses: {
      200: {
        bodyMapper: Mappers.SpecBoxWebApiModelProjectStructureModel,
      },
      404: {
        bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
      },
    },
    queryParameters: [Parameters.version],
    urlParameters: [Parameters.$host, Parameters.project, Parameters.treeCode],
    headerParameters: [Parameters.accept],
    serializer,
  };
const statUploadAutotestsOperationSpec: coreClient.OperationSpec = {
  path: '/stat/upload-autotests',
  httpMethod: 'POST',
  responses: { 200: {} },
  requestBody: Parameters.body1,
  queryParameters: [Parameters.version, Parameters.project1],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: 'json',
  serializer,
};
const statOperationSpec: coreClient.OperationSpec = {
  path: '/stat',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelStatModel,
    },
  },
  queryParameters: [
    Parameters.version,
    Parameters.project1,
    Parameters.from,
    Parameters.to,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
