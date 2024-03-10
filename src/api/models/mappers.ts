import * as coreClient from '@azure/core-client';

export const SpecBoxWebApiModelDefaultConfigurationModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelDefaultConfigurationModel',
      modelProperties: {
        metrikaCounterId: {
          serializedName: 'metrikaCounterId',
          nullable: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadData: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'SpecBoxWebApiModelUploadData',
    modelProperties: {
      features: {
        serializedName: 'features',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelUploadFeatureModel',
            },
          },
        },
      },
      attributes: {
        serializedName: 'attributes',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelUploadAttributeModel',
            },
          },
        },
      },
      trees: {
        serializedName: 'trees',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelUploadTreeModel',
            },
          },
        },
      },
      project: {
        serializedName: 'project',
        type: {
          name: 'Composite',
          className: 'SpecBoxWebApiModelUploadProjectModel',
        },
      },
    },
  },
};

export const SpecBoxWebApiModelUploadFeatureModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadFeatureModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        filePath: {
          serializedName: 'filePath',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        groups: {
          serializedName: 'groups',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelUploadAssertionGroupModel',
              },
            },
          },
        },
        attributes: {
          serializedName: 'attributes',
          nullable: true,
          type: {
            name: 'Dictionary',
            value: {
              type: { name: 'Sequence', element: { type: { name: 'String' } } },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadAssertionGroupModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadAssertionGroupModel',
      modelProperties: {
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        assertions: {
          serializedName: 'assertions',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelUploadAssertionModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadAssertionModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadAssertionModel',
      modelProperties: {
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        isAutomated: {
          serializedName: 'isAutomated',
          required: true,
          type: {
            name: 'Boolean',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadAttributeModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadAttributeModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        values: {
          serializedName: 'values',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelUploadAttributeValueModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadAttributeValueModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadAttributeValueModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelUploadTreeModel: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'SpecBoxWebApiModelUploadTreeModel',
    modelProperties: {
      code: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      title: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'title',
        required: true,
        type: {
          name: 'String',
        },
      },
      attributes: {
        serializedName: 'attributes',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'String',
            },
          },
        },
      },
    },
  },
};

export const SpecBoxWebApiModelUploadProjectModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelUploadProjectModel',
      modelProperties: {
        title: {
          serializedName: 'title',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        repositoryUrl: {
          serializedName: 'repositoryUrl',
          nullable: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const MicrosoftAspNetCoreMvcProblemDetails: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'MicrosoftAspNetCoreMvcProblemDetails',
      additionalProperties: { type: { name: 'Object' } },
      modelProperties: {
        type: {
          serializedName: 'type',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        title: {
          serializedName: 'title',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        status: {
          serializedName: 'status',
          nullable: true,
          type: {
            name: 'Number',
          },
        },
        detail: {
          serializedName: 'detail',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        instance: {
          serializedName: 'instance',
          nullable: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelCommonProjectModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelCommonProjectModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        repositoryUrl: {
          serializedName: 'repositoryUrl',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        versions: {
          serializedName: 'versions',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelCommonVersionModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelCommonVersionModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelCommonVersionModel',
      modelProperties: {
        version: {
          serializedName: 'version',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        updatedAt: {
          serializedName: 'updatedAt',
          nullable: true,
          type: {
            name: 'DateTime',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectFeatureModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectFeatureModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        filePath: {
          serializedName: 'filePath',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        assertionGroups: {
          serializedName: 'assertionGroups',
          required: true,
          readOnly: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelProjectAssertionGroupModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectAssertionGroupModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectAssertionGroupModel',
      modelProperties: {
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        order: {
          serializedName: 'order',
          required: true,
          type: {
            name: 'Number',
          },
        },
        assertions: {
          serializedName: 'assertions',
          required: true,
          readOnly: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelProjectAssertionModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectAssertionModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectAssertionModel',
      modelProperties: {
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        order: {
          serializedName: 'order',
          required: true,
          type: {
            name: 'Number',
          },
        },
        isAutomated: {
          serializedName: 'isAutomated',
          required: true,
          type: {
            name: 'Boolean',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectStructureModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectStructureModel',
      modelProperties: {
        project: {
          serializedName: 'project',
          type: {
            name: 'Composite',
            className: 'SpecBoxWebApiModelCommonProjectVersionModel',
          },
        },
        tree: {
          serializedName: 'tree',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelProjectTreeNodeModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelCommonProjectVersionModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelCommonProjectVersionModel',
      modelProperties: {
        code: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'code',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        repositoryUrl: {
          serializedName: 'repositoryUrl',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        version: {
          serializedName: 'version',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        createdAt: {
          serializedName: 'createdAt',
          nullable: true,
          type: {
            name: 'DateTime',
          },
        },
        updatedAt: {
          serializedName: 'updatedAt',
          nullable: true,
          type: {
            name: 'DateTime',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectTreeNodeModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectTreeNodeModel',
      modelProperties: {
        id: {
          serializedName: 'id',
          required: true,
          type: {
            name: 'Uuid',
          },
        },
        parentId: {
          serializedName: 'parentId',
          nullable: true,
          type: {
            name: 'Uuid',
          },
        },
        featureCode: {
          serializedName: 'featureCode',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        title: {
          serializedName: 'title',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        totalCount: {
          serializedName: 'totalCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
        automatedCount: {
          serializedName: 'automatedCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
        sortOrder: {
          serializedName: 'sortOrder',
          nullable: true,
          type: {
            name: 'Number',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectTreeModel: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'SpecBoxWebApiModelProjectTreeModel',
    modelProperties: {
      code: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'code',
        required: true,
        type: {
          name: 'String',
        },
      },
      title: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'title',
        required: true,
        type: {
          name: 'String',
        },
      },
    },
  },
};

export const SpecBoxWebApiModelProjectFeatureRelationsModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectFeatureRelationsModel',
      modelProperties: {
        nodes: {
          serializedName: 'nodes',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelProjectGraphNodeModel',
              },
            },
          },
        },
        edges: {
          serializedName: 'edges',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelProjectGraphEdgeModel',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectGraphNodeModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectGraphNodeModel',
      modelProperties: {
        id: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'id',
          required: true,
          type: {
            name: 'String',
          },
        },
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelProjectGraphEdgeModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelProjectGraphEdgeModel',
      modelProperties: {
        source: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'source',
          required: true,
          type: {
            name: 'String',
          },
        },
        target: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'target',
          required: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelStatAutotestsStatUploadData: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelStatAutotestsStatUploadData',
      modelProperties: {
        timestamp: {
          serializedName: 'timestamp',
          required: true,
          type: {
            name: 'DateTime',
          },
        },
        duration: {
          serializedName: 'duration',
          required: true,
          type: {
            name: 'Number',
          },
        },
        assertionsCount: {
          serializedName: 'assertionsCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelStatModel: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'SpecBoxWebApiModelStatModel',
    modelProperties: {
      project: {
        serializedName: 'project',
        type: {
          name: 'Composite',
          className: 'SpecBoxWebApiModelCommonProjectVersionModel',
        },
      },
      assertions: {
        serializedName: 'assertions',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelStatAssertionsStatModel',
            },
          },
        },
      },
      autotests: {
        serializedName: 'autotests',
        required: true,
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'SpecBoxWebApiModelStatAutotestsStatModel',
            },
          },
        },
      },
    },
  },
};

export const SpecBoxWebApiModelStatAssertionsStatModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelStatAssertionsStatModel',
      modelProperties: {
        timestamp: {
          serializedName: 'timestamp',
          required: true,
          type: {
            name: 'DateTime',
          },
        },
        totalCount: {
          serializedName: 'totalCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
        automatedCount: {
          serializedName: 'automatedCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelStatAutotestsStatModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelStatAutotestsStatModel',
      modelProperties: {
        timestamp: {
          serializedName: 'timestamp',
          required: true,
          type: {
            name: 'DateTime',
          },
        },
        duration: {
          serializedName: 'duration',
          required: true,
          type: {
            name: 'Number',
          },
        },
        assertionsCount: {
          serializedName: 'assertionsCount',
          required: true,
          type: {
            name: 'Number',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunCreateTestRunModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunCreateTestRunModel',
      modelProperties: {
        title: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'title',
          required: true,
          type: {
            name: 'String',
          },
        },
        description: {
          serializedName: 'description',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        environment: {
          serializedName: 'environment',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        configuration: {
          serializedName: 'configuration',
          nullable: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunProjectTestRunsModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunProjectTestRunsModel',
      modelProperties: {
        project: {
          serializedName: 'project',
          type: {
            name: 'Composite',
            className: 'SpecBoxWebApiModelCommonProjectVersionModel',
          },
        },
        testRuns: {
          serializedName: 'testRuns',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'Composite',
                className: 'SpecBoxWebApiModelTestRunModel',
              },
            },
          },
        },
        configurations: {
          serializedName: 'configurations',
          type: {
            name: 'Composite',
            className: 'SpecBoxWebApiModelTestRunConfigurationsModel',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunModel: coreClient.CompositeMapper = {
  type: {
    name: 'Composite',
    className: 'SpecBoxWebApiModelTestRunModel',
    modelProperties: {
      id: {
        serializedName: 'id',
        required: true,
        type: {
          name: 'Uuid',
        },
      },
      title: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'title',
        required: true,
        type: {
          name: 'String',
        },
      },
      description: {
        serializedName: 'description',
        nullable: true,
        type: {
          name: 'String',
        },
      },
      projectCode: {
        constraints: {
          MinLength: 1,
        },
        serializedName: 'projectCode',
        required: true,
        type: {
          name: 'String',
        },
      },
      version: {
        serializedName: 'version',
        nullable: true,
        type: {
          name: 'String',
        },
      },
      createdAt: {
        serializedName: 'createdAt',
        required: true,
        type: {
          name: 'DateTime',
        },
      },
      startedAt: {
        serializedName: 'startedAt',
        nullable: true,
        type: {
          name: 'DateTime',
        },
      },
      completedAt: {
        serializedName: 'completedAt',
        nullable: true,
        type: {
          name: 'DateTime',
        },
      },
      totalCount: {
        serializedName: 'totalCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      passedCount: {
        serializedName: 'passedCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      failedCount: {
        serializedName: 'failedCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      blockedCount: {
        serializedName: 'blockedCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      invalidCount: {
        serializedName: 'invalidCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      skippedCount: {
        serializedName: 'skippedCount',
        required: true,
        type: {
          name: 'Number',
        },
      },
      environment: {
        serializedName: 'environment',
        nullable: true,
        type: {
          name: 'String',
        },
      },
      configuration: {
        serializedName: 'configuration',
        nullable: true,
        type: {
          name: 'String',
        },
      },
    },
  },
};

export const SpecBoxWebApiModelTestRunConfigurationsModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunConfigurationsModel',
      modelProperties: {
        configurations: {
          serializedName: 'configurations',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'String',
              },
            },
          },
        },
        environments: {
          serializedName: 'environments',
          required: true,
          type: {
            name: 'Sequence',
            element: {
              type: {
                name: 'String',
              },
            },
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunDetailsModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunDetailsModel',
      modelProperties: {
        project: {
          serializedName: 'project',
          type: {
            name: 'Composite',
            className: 'SpecBoxWebApiModelCommonProjectVersionModel',
          },
        },
        testRun: {
          serializedName: 'testRun',
          type: {
            name: 'Composite',
            className: 'SpecBoxWebApiModelTestRunModel',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunTestResultModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunTestResultModel',
      modelProperties: {
        id: {
          serializedName: 'id',
          required: true,
          type: {
            name: 'Uuid',
          },
        },
        testRunId: {
          serializedName: 'testRunId',
          required: true,
          type: {
            name: 'Uuid',
          },
        },
        status: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'status',
          required: true,
          type: {
            name: 'String',
          },
        },
        report: {
          serializedName: 'report',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        updatedAt: {
          serializedName: 'updatedAt',
          required: true,
          type: {
            name: 'DateTime',
          },
        },
        startedAt: {
          serializedName: 'startedAt',
          nullable: true,
          type: {
            name: 'DateTime',
          },
        },
        completedAt: {
          serializedName: 'completedAt',
          nullable: true,
          type: {
            name: 'DateTime',
          },
        },
        assertionTitle: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'assertionTitle',
          required: true,
          type: {
            name: 'String',
          },
        },
        assertionGroupTitle: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'assertionGroupTitle',
          required: true,
          type: {
            name: 'String',
          },
        },
        featureCode: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'featureCode',
          required: true,
          type: {
            name: 'String',
          },
        },
        featureTitle: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'featureTitle',
          required: true,
          type: {
            name: 'String',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunUpdateTestResultModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunUpdateTestResultModel',
      modelProperties: {
        status: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'status',
          required: true,
          type: {
            name: 'String',
          },
        },
        report: {
          serializedName: 'report',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        updatedAt: {
          serializedName: 'updatedAt',
          type: {
            name: 'DateTime',
          },
        },
      },
    },
  };

export const SpecBoxWebApiModelTestRunTestResultHistoryModel: coreClient.CompositeMapper =
  {
    type: {
      name: 'Composite',
      className: 'SpecBoxWebApiModelTestRunTestResultHistoryModel',
      modelProperties: {
        id: {
          serializedName: 'id',
          required: true,
          type: {
            name: 'Uuid',
          },
        },
        testRunId: {
          serializedName: 'testRunId',
          required: true,
          type: {
            name: 'Uuid',
          },
        },
        testRunTitle: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'testRunTitle',
          required: true,
          type: {
            name: 'String',
          },
        },
        version: {
          serializedName: 'version',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        status: {
          constraints: {
            MinLength: 1,
          },
          serializedName: 'status',
          required: true,
          type: {
            name: 'String',
          },
        },
        report: {
          serializedName: 'report',
          nullable: true,
          type: {
            name: 'String',
          },
        },
        completedAt: {
          serializedName: 'completedAt',
          required: true,
          type: {
            name: 'DateTime',
          },
        },
      },
    },
  };
