import { useStore } from 'effector-react/scope';
import { FC } from 'react';

import { useTitle } from '@/hooks/useTitle';
import * as model from '@/model/pages/home';
import { cn } from '@bem-react/classname';

import { ProjectList } from '@/components/ProjectList/ProjectList';
import { VersionList } from '@/components/VersionList/VersionList';
import './Home.css';

const bem = cn('Home');

export const Home: FC = () => {
  const projects = useStore(model.$projects);
  const projectsIsPending = useStore(model.$projectsIsLoading);
  useTitle('Проекты');

  const selectedProject = useStore(model.$selectedProject);

  const projectsContent = projectsIsPending ? (
    <div>загрузка...</div>
  ) : (
    <ProjectList projects={projects} />
  );
  const versionsContent = selectedProject ? (
    <VersionList projectCode={selectedProject.code} versions={selectedProject.versions} />
  ) : (
    <div>Выберите проект</div>
  );


  return (
    <div className={bem()}>
      <div className={bem('Banner')}>
        <span>Spec Box TMS</span>
        <div className={bem('Hint')}>
          Управление функциональными требованиями
        </div>
      </div>
      <div className={bem('Content')}>
        <div className={bem('Projects')}>
          <div className={bem('Header')}>Проекты</div>
          {projectsContent}
          <div className={bem('Hint')}>
            Проекты в системе.
          </div>
        </div>
        <div className={bem('Versions')}>
          <div className={bem('Header')}>Версии</div>
          {versionsContent}
          <div className={bem('Hint')}>
            Версии проектов, в которых есть изменения в спецификации.
          </div>
        </div>
      </div>
    </div>
  );
};
