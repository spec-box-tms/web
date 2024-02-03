import * as model from '@/model/pages/project';
import { cn } from '@bem-react/classname';
import { Box } from '@gravity-ui/icons';
import { Icon, Skeleton } from '@gravity-ui/uikit';
import { RouteInstance } from 'atomic-router';
import { useStore } from 'effector-react/scope';
import { FC, ReactNode } from 'react';

import {
  OpenFeatureLinkEventHandler,
  ProjectContext,
} from '@/components/ProjectContext/ProjectContext';
import { RouteLinkButton } from '@/components/RouteLinkButton/RouteLinkButton';

import { homeRoute, projectRoute, statRoute } from '@/model';

import './ProjectLayout.css';
import { Tree } from '@/types';

const bem = cn('ProjectLayout');

type ProjectLayoutProps = {
  project: string;
  version?: string;
  navigate?: OpenFeatureLinkEventHandler;
  contentClassName?: string;
  children?: ReactNode;
};

const mapQuery = (version?: string, tree?: string) => {
  const query = {
    ...(version && { version }),
    ...(tree && { tree }),
  };

  return query;
};

const mapView = (isActive: boolean) => {
  return isActive ? 'normal' : 'flat';
};

interface NavItemProps {
  to: RouteInstance<{ project?: string }>;
  text: string;
  project: string;
  version?: string;
}

const NavItem: FC<NavItemProps> = ({ to, text, project, version }) => {
  const isOpened = useStore(to.$isOpened);

  if (!project) {
    return <Skeleton />;
  }

  return (
    <RouteLinkButton
      to={to}
      params={{ project }}
      query={mapQuery(version)}
      view={mapView(isOpened)}
      size="l"
      pin="circle-circle"
    >
      {text}
    </RouteLinkButton>
  );
};

export interface TreeListProps {
  isPending: boolean;
  project: string;
  version?: string;
  trees: Tree[];
}

const TreeList: FC<TreeListProps> = ({ isPending, project, version, trees }) => {
  const selectedTree = useStore(model.$tree);
  const isOpened = useStore(projectRoute.$isOpened);

  if (!project || isPending) {
    return <Skeleton />;
  } else {
    trees = [...trees].sort((a, b) => a.title.localeCompare(b.title));

    return (
      <>
        <RouteLinkButton
          to={projectRoute}
          params={{ project }}
          query={mapQuery(version)}
          view={mapView(isOpened && selectedTree === null)}
          size="l"
          pin="circle-circle"
        >
          Все
        </RouteLinkButton>
        {trees.map((tree) => (
          <RouteLinkButton
            key={tree.code}
            to={projectRoute}
            params={{ project }}
            query={mapQuery(version, tree.code)}
            view={mapView(isOpened && selectedTree === tree.code)}
            size="l"
            pin="circle-circle"
          >
            {tree.title}
          </RouteLinkButton>
        ))}
      </>
    );
  }
};

export const ProjectLayout: FC<ProjectLayoutProps> = (props) => {
  const { children, contentClassName, navigate, project, version } = props;
  const { project: { title: projectTitle } } = useStore(model.$structure);
  const tree = useStore(model.$tree);

  const trees = useStore(model.$trees);
  const treesIsPending = useStore(model.$treesIsPending);

  return (
    <ProjectContext.Provider value={{ project, version, tree: tree || undefined, navigate }}>
      <div className={bem()}>
        <div className={bem('Header')}>
          <div className={bem('Logo')}>
            <RouteLinkButton
              to={homeRoute}
              params={{}}
              view="flat-info"
              size="l"
              pin="circle-circle"
            >
              <Icon size={24} data={Box} />
            </RouteLinkButton>
          </div>
          <div className={bem('Title')}>
            <h2>{projectTitle} {version && `(${version})`}</h2>
          </div>
          <div className={bem('Navigation')}>
            <TreeList project={project} version={version} isPending={treesIsPending} trees={trees} />
            <NavItem to={statRoute} project={project} version={version} text="Статистика" />
          </div>
        </div>
        <div className={bem('Content', [contentClassName])}>{children}</div>
      </div>
    </ProjectContext.Provider>
  );
};
