import { INode, NodeConfig } from '@antv/g6';
import { GraphinContext, IG6GraphEvent } from '@antv/graphin';
import { FC, useContext, useEffect } from 'react';

interface SelectNodeBehaviourProps {
  onNodeClick?: (nodeId: string) => void;
}

export const SelectNodeBehaviour: FC<SelectNodeBehaviourProps> = (props) => {
  const { graph, apis } = useContext(GraphinContext);

  const { onNodeClick } = props;

  useEffect(() => {
    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      const [type, code] = model.id.split(':');
      if (type === 'feature' && onNodeClick) {
        onNodeClick(code);
      }
      apis.focusNodeById(model.id);
    };
    graph.on('node:click', handleClick);
    return () => {
      graph.off('node:click', handleClick);
    };
  }, [apis, graph, onNodeClick]);
  return null;
};
