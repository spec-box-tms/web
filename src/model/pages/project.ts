import { createRoute, querySync } from 'atomic-router';
import copy from 'copy-to-clipboard';
import { combine, createEvent, createStore, restore, sample } from 'effector';
import { toast } from 'react-toastify';

import { Feature, ProjectStructure, TreeNode } from '@/types';

import { controls } from '../common';
import { loadFeatureQuery, loadStructureQuery, loadTreesQuery } from '../queries';
import { createSpecBoxEffect } from '../scope';

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

export const loadTreesFx = createSpecBoxEffect(loadTreesQuery);
export const $trees = restore(loadTreesFx.doneData, []);
export const $treesIsPending = loadTreesFx.pending;

export const loadStructureFx = createSpecBoxEffect(loadStructureQuery);
export const $structure = restore(loadStructureFx.doneData, STRUCTURE_STUB);
export const $structureIsPending = loadStructureFx.pending;

export interface LoadTreeParams {
  tree: string;
}
export const loadTree = createEvent<LoadTreeParams>();

querySync({
  source: {
    tree: restore(
      loadTree.map(({ tree }) => tree),
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

export const loadFeatureFx = createSpecBoxEffect(loadFeatureQuery);

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
    tree: $tree,
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
