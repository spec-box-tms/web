import { RouteInstance } from 'atomic-router';
import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { Icon, Skeleton } from '@gravity-ui/uikit';
import { useStore } from 'effector-react/scope';
import { Box } from '@gravity-ui/icons';

import {
  ProjectContext,
  OpenFeatureLinkEventHandler,
} from '@/components/ProjectContext/ProjectContext';
import { RouteLinkButton } from '@/components/RouteLinkButton/RouteLinkButton';

import { homeRoute, projectRoute, statRoute } from '@/model';

import './ProjectLayout.css';

const bem = cn('ProjectLayout');

type ProjectLayoutProps = {
  project: string;
  version?: string;
  navigate?: OpenFeatureLinkEventHandler;
  contentClassName?: string;
  children?: ReactNode;
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

  const view = isOpened ? 'normal' : 'flat';

  return (
    <RouteLinkButton
      to={to}
      params={{ project }}
      query={version ? { version } : undefined}
      view={view}
      size="l"
      pin="circle-circle"
    >
      {text}
    </RouteLinkButton>
  );
};

export const ProjectLayout: FC<ProjectLayoutProps> = (props) => {
  const { children, contentClassName, navigate, project, version } = props;
  return (
    <ProjectContext.Provider value={{ project, version, navigate }}>
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
          <div className={bem('Navigation')}>
            <NavItem to={projectRoute} project={project} version={version} text="Структура" />
            <NavItem to={statRoute} project={project} version={version} text="Статистика" />
          </div>
        </div>
        <div className={bem('Content', [contentClassName])}>{children}</div>
      </div>
    </ProjectContext.Provider>
  );
};
