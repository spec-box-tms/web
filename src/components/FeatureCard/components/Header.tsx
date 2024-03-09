import { CopyFeatureCodeButton } from '@/components/CopyFeatureCodeButton/CopyFeatureCodeButton';
import { GoToYamlButton } from '@/components/GoToYamlButton/GoToYamlButton';
import { Feature } from '@/types';
import { useEvent, useStore } from 'effector-react/scope';
import { FC } from 'react';
import { bem } from '../FeatureCard.cn';
import './Header.css';
import { Stat } from './Stat';

import { OpenGraphButton } from '@/components/OpenGraphButton/OpenGraphButton';
import * as model from '@/model/pages/project';

type HeaderProps = {
  feature: Feature;
  repositoryUrl?: string;
};

export const Header: FC<HeaderProps> = (props) => {
  const { feature, repositoryUrl } = props;
  const { total, automated } = feature.assertionsCount;
  
  const featureRelations = useStore(model.$featureRelations);
  const selectFeature = useEvent(model.loadFeature);

  const handleGraphFeatureSelected = (feature: string) => {
    selectFeature({ feature });
  };

  return (
    <div className={bem('Header')}>
      <div className={bem('HeaderBody')}>
        <div className={bem('HeaderContent')}>
          <div className={bem('Title')}>{feature.title}</div>
        </div>
        <div className={bem('Actions')}>
          <CopyFeatureCodeButton code={feature.code} />
          <GoToYamlButton filePath={feature.filePath} repositoryUrl={repositoryUrl} />
          <OpenGraphButton data={featureRelations} onFeatureSeleted={handleGraphFeatureSelected} />
        </div>
      </div>
      <div className={bem('HeaderSidebar')}>
        <Stat total={total} automated={automated} />
      </div>
    </div>
  );
};
