import { createContext } from 'react';

export type OpenFeatureLinkEventHandler = (feature: string) => void;

export interface ProjectContextValue {
  project: string;
  version?: string;
  tree?: string;
  navigate?: OpenFeatureLinkEventHandler;
}

export const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);
