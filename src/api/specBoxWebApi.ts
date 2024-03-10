import * as coreClient from '@azure/core-client';
import * as Parameters from './models/parameters';
import * as Mappers from './models/mappers';
import {
  SpecBoxWebApiOptionalParams,
  DefaultOptionalParams,
  DefaultResponse,
  ExportOptionalParams,
  ExportResponse,
  ListProjectsOptionalParams,
  ListProjectsResponse,
  GetFeatureOptionalParams,
  GetFeatureResponse,
  GetStructurePlainOptionalParams,
  GetStructurePlainResponse,
  ListStructuresOptionalParams,
  ListStructuresResponse,
  GetStructureOptionalParams,
  GetStructureResponse,
  GetFeatureRelationsOptionalParams,
  GetFeatureRelationsResponse,
  AutotestsStatUploadOptionalParams,
  GetAutotestsStatOptionalParams,
  GetAutotestsStatResponse,
  CreateTestRunOptionalParams,
  CreateTestRunResponse,
  ListTestRunsOptionalParams,
  ListTestRunsResponse,
  GetTestRunOptionalParams,
  GetTestRunResponse,
  CompleteTestRunOptionalParams,
  CompleteTestRunResponse,
  ListTestResultsOptionalParams,
  ListTestResultsResponse,
  GetTestResultOptionalParams,
  GetTestResultResponse,
  UpdateTestResultOptionalParams,
  UpdateTestResultResponse,
  GetTestResultHistoryOptionalParams,
  GetTestResultHistoryResponse,
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

  /**
   * Получение конфигурации приложения
   * @param options The options parameters.
   */
  default(options?: DefaultOptionalParams): Promise<DefaultResponse> {
    return this.sendOperationRequest({ options }, defaultOperationSpec);
  }

  /**
   * Uploads project data. If project with the same code and version exists, it will be updated.
   * If project has test runs, it can't be updated.
   * @param project The project code
   * @param options The options parameters.
   */
  export(
    project: string,
    options?: ExportOptionalParams,
  ): Promise<ExportResponse> {
    return this.sendOperationRequest({ project, options }, exportOperationSpec);
  }

  /**
   * Returns the list of projects.
   * @param options The options parameters.
   */
  listProjects(
    options?: ListProjectsOptionalParams,
  ): Promise<ListProjectsResponse> {
    return this.sendOperationRequest({ options }, listProjectsOperationSpec);
  }

  /**
   * Returns the feature details.
   * @param project The project code.
   * @param feature The feature code.
   * @param options The options parameters.
   */
  getFeature(
    project: string,
    feature: string,
    options?: GetFeatureOptionalParams,
  ): Promise<GetFeatureResponse> {
    return this.sendOperationRequest(
      { project, feature, options },
      getFeatureOperationSpec,
    );
  }

  /**
   * Returns the list of features for a specific project.
   * @param project The project code.
   * @param options The options parameters.
   */
  getStructurePlain(
    project: string,
    options?: GetStructurePlainOptionalParams,
  ): Promise<GetStructurePlainResponse> {
    return this.sendOperationRequest(
      { project, options },
      getStructurePlainOperationSpec,
    );
  }

  /**
   * Returns the list of structures for a specific project.
   * @param project The project code.
   * @param options The options parameters.
   */
  listStructures(
    project: string,
    options?: ListStructuresOptionalParams,
  ): Promise<ListStructuresResponse> {
    return this.sendOperationRequest(
      { project, options },
      listStructuresOperationSpec,
    );
  }

  /**
   * Returns the structure details.
   * @param project The project code.
   * @param treeCode The tree code.
   * @param options The options parameters.
   */
  getStructure(
    project: string,
    treeCode: string,
    options?: GetStructureOptionalParams,
  ): Promise<GetStructureResponse> {
    return this.sendOperationRequest(
      { project, treeCode, options },
      getStructureOperationSpec,
    );
  }

  /**
   * Returns the graph of feature and attribute rlations.
   * @param project The project code.
   * @param options The options parameters.
   */
  getFeatureRelations(
    project: string,
    options?: GetFeatureRelationsOptionalParams,
  ): Promise<GetFeatureRelationsResponse> {
    return this.sendOperationRequest(
      { project, options },
      getFeatureRelationsOperationSpec,
    );
  }

  /** @param options The options parameters. */
  autotestsStatUpload(
    options?: AutotestsStatUploadOptionalParams,
  ): Promise<void> {
    return this.sendOperationRequest(
      { options },
      autotestsStatUploadOperationSpec,
    );
  }

  /** @param options The options parameters. */
  getAutotestsStat(
    options?: GetAutotestsStatOptionalParams,
  ): Promise<GetAutotestsStatResponse> {
    return this.sendOperationRequest(
      { options },
      getAutotestsStatOperationSpec,
    );
  }

  /**
   * Creates a new test run for the specified project.
   * @param project The project code.
   * @param options The options parameters.
   */
  createTestRun(
    project: string,
    options?: CreateTestRunOptionalParams,
  ): Promise<CreateTestRunResponse> {
    return this.sendOperationRequest(
      { project, options },
      createTestRunOperationSpec,
    );
  }

  /**
   * Retrieves a list of test runs for a specific project from the database.
   * @param project The project code for which to retrieve the test runs.
   * @param options The options parameters.
   */
  listTestRuns(
    project: string,
    options?: ListTestRunsOptionalParams,
  ): Promise<ListTestRunsResponse> {
    return this.sendOperationRequest(
      { project, options },
      listTestRunsOperationSpec,
    );
  }

  /**
   * Retrieves a specific test run by ID.
   * @param testRunId Test run ID
   * @param options The options parameters.
   */
  getTestRun(
    testRunId: string,
    options?: GetTestRunOptionalParams,
  ): Promise<GetTestRunResponse> {
    return this.sendOperationRequest(
      { testRunId, options },
      getTestRunOperationSpec,
    );
  }

  /**
   * Completes a specific test run by ID. All test result in NEW status will be marked as SKIPPED.
   * @param testRunId Test run ID
   * @param options The options parameters.
   */
  completeTestRun(
    testRunId: string,
    options?: CompleteTestRunOptionalParams,
  ): Promise<CompleteTestRunResponse> {
    return this.sendOperationRequest(
      { testRunId, options },
      completeTestRunOperationSpec,
    );
  }

  /**
   * Retrieves test results for a specific test run.
   * @param testRunId The ID of the test run.
   * @param options The options parameters.
   */
  listTestResults(
    testRunId: string,
    options?: ListTestResultsOptionalParams,
  ): Promise<ListTestResultsResponse> {
    return this.sendOperationRequest(
      { testRunId, options },
      listTestResultsOperationSpec,
    );
  }

  /**
   * Retrieves a specific test result for a given project, test run, and test result ID from the
   * database.
   * @param testRunId The ID of the test run.
   * @param testResultId The ID of the test result.
   * @param options The options parameters.
   */
  getTestResult(
    testRunId: string,
    testResultId: string,
    options?: GetTestResultOptionalParams,
  ): Promise<GetTestResultResponse> {
    return this.sendOperationRequest(
      { testRunId, testResultId, options },
      getTestResultOperationSpec,
    );
  }

  /**
   * Updates test result with provided Status and Report.
   * Supported Statuses: PASSED, SKIPPED, BLOCKED, INVALID, FAILED, NEW
   * @param testRunId The ID of the test run.
   * @param testResultId The ID of the test result.
   * @param options The options parameters.
   */
  updateTestResult(
    testRunId: string,
    testResultId: string,
    options?: UpdateTestResultOptionalParams,
  ): Promise<UpdateTestResultResponse> {
    return this.sendOperationRequest(
      { testRunId, testResultId, options },
      updateTestResultOperationSpec,
    );
  }

  /**
   * Retrieves test result history.
   * @param testRunId The ID of the test run.
   * @param testResultId The ID of the test result.
   * @param options The options parameters.
   */
  getTestResultHistory(
    testRunId: string,
    testResultId: string,
    options?: GetTestResultHistoryOptionalParams,
  ): Promise<GetTestResultHistoryResponse> {
    return this.sendOperationRequest(
      { testRunId, testResultId, options },
      getTestResultHistoryOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const defaultOperationSpec: coreClient.OperationSpec = {
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
const exportOperationSpec: coreClient.OperationSpec = {
  path: '/export/upload/{project}',
  httpMethod: 'POST',
  responses: {
    200: {},
    400: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
};
const listProjectsOperationSpec: coreClient.OperationSpec = {
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
const getFeatureOperationSpec: coreClient.OperationSpec = {
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
const getStructurePlainOperationSpec: coreClient.OperationSpec = {
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
const listStructuresOperationSpec: coreClient.OperationSpec = {
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
const getStructureOperationSpec: coreClient.OperationSpec = {
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
const getFeatureRelationsOperationSpec: coreClient.OperationSpec = {
  path: '/projects/{project}/features:relations',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelProjectFeatureRelationsModel,
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
const autotestsStatUploadOperationSpec: coreClient.OperationSpec = {
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
const getAutotestsStatOperationSpec: coreClient.OperationSpec = {
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
    Parameters.fromParam,
    Parameters.to,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const createTestRunOperationSpec: coreClient.OperationSpec = {
  path: '/tests/projects/{project}/testruns',
  httpMethod: 'POST',
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  requestBody: Parameters.body2,
  queryParameters: [Parameters.version],
  urlParameters: [Parameters.$host, Parameters.project],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
};
const listTestRunsOperationSpec: coreClient.OperationSpec = {
  path: '/tests/projects/{project}/testruns',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelTestRunProjectTestRunsModel,
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
const getTestRunOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelTestRunDetailsModel,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  urlParameters: [Parameters.$host, Parameters.testRunId],
  headerParameters: [Parameters.accept],
  serializer,
};
const completeTestRunOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}/complete',
  httpMethod: 'POST',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelTestRunDetailsModel,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  urlParameters: [Parameters.$host, Parameters.testRunId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listTestResultsOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}/testresults',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelTestRunTestResultModel',
            },
          },
        },
      },
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  urlParameters: [Parameters.$host, Parameters.testRunId],
  headerParameters: [Parameters.accept],
  serializer,
};
const getTestResultOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}/testresults/{testResultId}',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelTestRunTestResultModel,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.testRunId,
    Parameters.testResultId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateTestResultOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}/testresults/{testResultId}',
  httpMethod: 'PUT',
  responses: {
    200: {
      bodyMapper: Mappers.SpecBoxWebApiModelTestRunTestResultModel,
    },
    400: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  requestBody: Parameters.body3,
  urlParameters: [
    Parameters.$host,
    Parameters.testRunId,
    Parameters.testResultId,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: 'json',
  serializer,
};
const getTestResultHistoryOperationSpec: coreClient.OperationSpec = {
  path: '/tests/testruns/{testRunId}/testresults/{testResultId}/history',
  httpMethod: 'GET',
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelTestRunTestResultHistoryModel',
            },
          },
        },
      },
    },
    404: {
      bodyMapper: Mappers.MicrosoftAspNetCoreMvcProblemDetails,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.testRunId,
    Parameters.testResultId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
