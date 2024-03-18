import * as model from '@/model/pages/project';
import { cn } from '@bem-react/classname';
import { Box } from '@gravity-ui/icons';
import { Icon, PortalProvider, Skeleton } from '@gravity-ui/uikit';
import { RouteInstance } from 'atomic-router';
import { useStore } from 'effector-react/scope';
import { FC, ReactNode, useRef } from 'react';

import {
  OpenFeatureLinkEventHandler,
  ProjectContext,
} from '@/components/ProjectContext/ProjectContext';
import { RouteLinkButton } from '@/components/RouteLinkButton/RouteLinkButton';

import { homeRoute, projectRoute, statRoute, testRunsRoute } from '@/model';

import { InfiniteLoader } from '../InfiniteLoader/InfiniteLoader';
import { VersionLabel } from '../VersionLabel/VersionLabel';
import './ProjectLayout.css';
import { Logo } from '../Logo/Logo';

const bem = cn('ProjectLayout');

type ProjectLayoutProps = {
  project: string;
  version?: string;
  navigate?: OpenFeatureLinkEventHandler;
  contentClassName?: string;
  children?: ReactNode;
  projectTitle?: string;
  isLoading?: boolean;
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

export const ProjectLayout: FC<ProjectLayoutProps> = (props) => {
  const { children, contentClassName, navigate, project, version, projectTitle, isLoading } = props;
  const projectRootRef = useRef(null);
  const tree = useStore(model.$tree);
  if (isLoading) {
    return <InfiniteLoader />;
  }

  return (
    <ProjectContext.Provider value={{ project, version, tree: tree || undefined, navigate }}>
      <div className={bem()} ref={projectRootRef}>
        <PortalProvider container={projectRootRef}>
          <div className={bem('Header')}>
            <div className={bem('Logo')}>
              <RouteLinkButton
                to={homeRoute}
                params={{}}
                view="flat-info"
                size="l"
                pin="circle-circle"
              >
                <Icon size={34} data={Logo} />
              </RouteLinkButton>
            </div>
            <div className={bem('Title')}>
              <h2>{projectTitle}</h2>
              <VersionLabel version={version} />
            </div>
            <div className={bem('Navigation')}>
              <NavItem to={projectRoute} project={project} version={version} text="Проект" />
              <NavItem to={testRunsRoute} project={project} version={version} text="Тестовые запуски" />
              <NavItem to={statRoute} project={project} version={version} text="Статистика" />
            </div>
          </div>
          <div className={bem('Content', [contentClassName])}>{children}</div>
        </PortalProvider>
      </div>
    </ProjectContext.Provider>
  );
};
