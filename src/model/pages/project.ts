import { createRoute, querySync } from 'atomic-router';
import copy from 'copy-to-clipboard';
import { combine, createEvent, createStore, restore, sample } from 'effector';
import { toast } from 'react-toastify';

import { mapFeature, mapStructure, mapTree } from '@/mappers';
import { Feature, ProjectStructure, Tree, TreeNode } from '@/types';

import { controls } from '../common';
import { StoreDependencies, createSpecBoxEffect } from '../scope';
import { SpecBoxWebApiModelProjectStructureModel } from '@/api';

const STRUCTURE_STUB: ProjectStructure = {
  tree: [],
  project: { code: '', title: '', version: '' },
};

export const projectRoute = createRoute<{
  project?: string;
}>();

export const $project = createStore<string>('').on(
  projectRoute.opened,
  (_, { params: { project = '' } }) => project
);

export const $version = createStore<string | null>(null).on(
  [projectRoute.opened, projectRoute.updated],
  (_, { query: { version } }) => version ?? null
);

export const $tree = createStore<string | null>(null).on(
  [projectRoute.opened, projectRoute.updated],
  (_, { query: { tree } }) => tree ?? null
);

export interface LoadTreesFxParams {
  project: string;
  version: string | null;
}

export const loadTreesFx = createSpecBoxEffect(
  async (
    { project, version }: LoadTreesFxParams,
    deps: StoreDependencies
  ): Promise<Tree[]> => {
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
);

export const $trees = restore(loadTreesFx.doneData, []);
export const $treesIsPending = loadTreesFx.pending;

export interface LoadStructureFxParams {
  project: string;
  version: string | null;
  tree: string | null;
}

export const loadStructureFx = createSpecBoxEffect(
  async (
    { project, version, tree }: LoadStructureFxParams,
    deps: StoreDependencies
  ): Promise<ProjectStructure> => {
    try {
      let response: SpecBoxWebApiModelProjectStructureModel;
      if (tree === null) {
        response = await deps.api.getStructurePlain(project, {
          version: version ?? undefined,
        });
      } else {
        response = await deps.api.getStructure(
          project,
          tree,
          { version: version ?? undefined }
        );
      }
      return mapStructure(response);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const $structure = restore(loadStructureFx.doneData, STRUCTURE_STUB);
export const $structureIsPending = loadStructureFx.pending;

export interface LoadTreeParams {
  tree: string;
}
export const loadTree = createEvent<LoadTreeParams>();
querySync({
  source: {
    tree: restore(
      loadTree.map(({ tree }) => tree ),
      null
    ),
  },
  route: projectRoute,
  controls,
});

export const toggle = createEvent<string>();
export const expand = createEvent<string[]>();

export const $collapseState = createStore<Record<string, boolean>>({})
  .on(toggle, (state, id) => ({ ...state, [id]: !state[id] }))
  .on(expand, (state, ids) =>
    ids.reduce((s, id) => ((s[id] = true), s), { ...state })
  );

export interface CopyToClipboardParams {
  text: string;
}

export const copyToClipboardFx = createSpecBoxEffect(
  async ({ text }: CopyToClipboardParams) => {
    if (copy(text)) {
      toast('Скопировано');
    } else {
      toast.error('Ошибка при копировании');
    }
  }
);

export interface LoadFeatureFxParams {
  project: string;
  version?: string;
  feature: string;
}

export const loadFeatureFx = createSpecBoxEffect(
  async (
    { project, version, feature }: LoadFeatureFxParams,
    deps: StoreDependencies
  ): Promise<Feature> => {
    try {
      const response = await deps.api.getFeature(
        project,
        feature,
        { version }
      );

      return mapFeature(response);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export interface LoadFeatureParams {
  feature: string;
}
export const loadFeature = createEvent<LoadFeatureParams>();
export const resetFeature = createEvent();

// код выбранной фичи (появляется в момент выбора)
export const $featureCode = createStore<string>('').on(
  loadFeatureFx,
  (_, { feature }) => feature
);

// данные выбранной фичи (появляются после загрузки)
export const $feature = createStore<Feature | null>(null).reset(resetFeature);
export const $featureIsPending = loadFeatureFx.pending;

querySync({
  source: {
    feature: restore(
      loadFeature.map(({ feature }) => feature),
      null
    ),
  },
  route: projectRoute,
  controls,
});

// при выборе активной фичи раскрываем всех её родителей
const getExpandedIds = (args: {
  feature: Feature | null;
  tree: ProjectStructure;
}): string[] => {
  const {
    feature,
    tree: { tree },
  } = args;
  const result: string[] = [];

  if (feature && tree.length) {
    let target: TreeNode | undefined;

    const obj = tree.reduce<Record<string, TreeNode>>((a, node) => {
      a[node.id] = node;

      if (node.type === 'feature' && node.featureCode === feature.code) {
        target = node;
      }

      return a;
    }, {});

    for (let id = target?.id; id !== undefined; id = obj[id]?.parentId) {
      result.push(id);
    }
  }

  return result;
};

sample({
  clock: combine({
    feature: $feature,
    tree: $structure,
  }),
  fn: getExpandedIds,
  target: expand,
});

sample({
  clock: combine({
    project: $project,
    version: $version,
  }),
  fn: ({ project, version }) => ({
    project,
    version,
  }),
  target: loadTreesFx,
});

sample({
  clock: combine({ 
    project: $project, 
    version: $version, 
    tree: $tree 
  }),
  fn: ({ project, version, tree }) => ({ project, version, tree }),
  target: loadStructureFx,
});

sample({
  clock: [projectRoute.opened, projectRoute.updated],
  filter: ({ query: { feature } }) => Boolean(feature),
  fn: ({
    params: { project = '' },
    query: { version = undefined, feature = '' },
  }) => ({
    project,
    version,
    feature,
  }),
  target: loadFeatureFx,
});

sample({
  clock: loadFeatureFx.doneData,
  target: $feature,
});

export const copyToClipboard = createEvent<CopyToClipboardParams>();

sample({
  clock: copyToClipboard,
  target: copyToClipboardFx,
});
