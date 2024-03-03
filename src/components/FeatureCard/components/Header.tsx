import { FC } from 'react';

import { Feature } from '@/types';

import { bem } from '../FeatureCard.cn';

import { Stat } from './Stat';

import { CopyFeatureCodeButton } from '@/components/CopyFeatureCodeButton/CopyFeatureCodeButton';
import { GoToYamlButton } from '@/components/GoToYamlButton/GoToYamlButton';
import './Header.css';

type HeaderProps = {
  feature: Feature;
  repositoryUrl?: string;
};

export const Header: FC<HeaderProps> = (props) => {
  const { feature, repositoryUrl } = props;
  const { total, automated } = feature.assertionsCount;


  return (
    <div className={bem('Header')}>
      <div className={bem('HeaderBody')}>
        <div className={bem('HeaderContent')}>
          <div className={bem('Title')}>{feature.title}</div>
        </div>
        <div className={bem('Actions')}>
          <CopyFeatureCodeButton code={feature.code} />
          <GoToYamlButton filePath={feature.filePath} repositoryUrl={repositoryUrl} />
        </div>
      </div>
      <div className={bem('HeaderSidebar')}>
        <Stat total={total} automated={automated} />
      </div>
    </div>
  );
};
