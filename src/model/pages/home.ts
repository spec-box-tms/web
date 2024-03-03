import { createRoute } from 'atomic-router';
import { createEvent, createStore, restore, sample } from 'effector';

import { mapProject } from '@/mappers';

import { Project } from '@/types';
import { createSpecBoxEffect } from '..';

export const homeRoute = createRoute();

const loadProjectListFx = createSpecBoxEffect(async (_, { api }) => {
  try {
    const response = await api.listProjects();

    return response.map(mapProject);
  } catch (e) {
    console.error(e);
    throw e;
  }
});


export const $projects = restore(loadProjectListFx.doneData, []);
export const $projectsIsLoading = loadProjectListFx.pending;

export const selectProject = createEvent<Project>();
export const $selectedProject = createStore<Project | null>(null)
  .on(selectProject, (_, project) => ({...project}));

sample({
  clock: [homeRoute.opened],
  target: loadProjectListFx,
});
