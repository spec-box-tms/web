import { FC } from 'react';

import { Project } from '@/types';

import { bem } from '../ProjectList.cn';

import { ListItem } from '@/components/ListItem/ListItem';
import * as model from '@/model/pages/home';
import { useStore, useUnit } from 'effector-react/scope';
import './Item.css';
export interface ItemProps {
  project: Project;
}

export const Item: FC<ItemProps> = (props) => {
  const { project } = props;
  const selectedProject = useStore(model.$selectedProject);

  const handleSelectProject = useUnit(model.selectProject);

  const description = project.description ? (
    <div className={bem('ProjectDescription')}>{project.description}</div>
  ) : undefined;

  return (
    <ListItem
      className={bem('Item')}
      view="flat"
      isActive={selectedProject?.code === project.code}
      onPress={() => handleSelectProject(project)}
    >
      <div className={bem('ProjectTitle')}>{project.title}</div>
      {description}
    </ListItem>
  );
};
