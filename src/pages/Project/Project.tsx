import { useEvent, useStore } from 'effector-react/scope';
import { FC, useCallback } from 'react';

import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import { useTitle } from '@/hooks/useTitle';
import * as model from '@/model/pages/project';
import { Feature } from '@/types';
import { cn } from '@bem-react/classname';

import './Project.css';
import { ProjectLayout } from '@/components/ProjectLayout/ProjectLayout';
import { ProjectTree } from '@/components/ProjectTree/ProejctTree';
import { InfiniteLoader } from '@/components/InfiniteLoader/InfiniteLoader';

const bem = cn('Project');

interface DetailsProps {
  feature: Feature | null;
  isPending: boolean;
  repositoryUrl?: string;
}

const Details: FC<DetailsProps> = ({ isPending, feature, repositoryUrl }) => {
  if (isPending) {
    return <InfiniteLoader />;
  } else if (!feature) {
    return <div>ничего не выбрано</div>;
  } else {
    return (
      <FeatureCard
        feature={feature}
        repositoryUrl={repositoryUrl}
      />
    );
  }
};

export const Project: FC = () => {
  const structureIsPending = useStore(model.$structureIsPending);
  const {
    project: { code: projectCode, title: projectTitle, repositoryUrl, version },
    tree,
  } = useStore(model.$structure);

  const loadFeature = useEvent(model.loadFeature);
  const loadTree = useEvent(model.loadTree);
  const feature = useStore(model.$feature);
  const featureCode = useStore(model.$featureCode);
  const featureIsPending = useStore(model.$featureIsPending);

  const onFeatureSelected = useCallback(
    (feature: string) => loadFeature({ feature }),
    [loadFeature]
  );

  const onTreeSelected = useCallback(
    (tree: string) => loadTree({ tree }),
    [loadTree]
  );

  const navigate = useCallback(
    (feature: string) => loadFeature({ feature }),
    [loadFeature]
  );

  useTitle(structureIsPending ? 'Структура проекта' : projectTitle);

  return (
    <ProjectLayout
      contentClassName={bem()}
      project={projectCode}
      projectTitle={projectTitle}
      version={version}
      navigate={navigate}
    >
      <div className={bem('ListPanel')}>
        <ProjectTree
          isPending={structureIsPending}
          tree={tree}
          onFeatureSelected={onFeatureSelected}
          onTreeSelected={onTreeSelected}
          selectedFeatureCode={featureCode}
        />
      </div>
      <div className={bem('DetailsPanel')}>
        <Details
          repositoryUrl={repositoryUrl}
          feature={feature}
          isPending={featureIsPending}
        />
      </div>
    </ProjectLayout>
  );
};
