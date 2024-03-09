import { FeatureRelations } from '@/types';
import Graphin, { Behaviors } from '@antv/graphin';
import { cn } from '@bem-react/classname';
import { Button, Select, Switch } from '@gravity-ui/uikit';
import { FC, useEffect, useRef, useState } from 'react';
import './FeatureGraph.css';
import { SelectNodeBehaviour } from './SelectNodeBehaviour';

const bem = cn('FeatureGraph');

const { DragCanvas, ZoomCanvas, DragNode, ClickSelect, Hoverable, ActivateRelations, ResizeCanvas } = Behaviors;

const LAYOUTS = [
  { value: 'gForce', content: 'Гравитационная' },
  { value: 'graphin-force', content: 'Весовая' },
  { value: 'circular', content: 'Круговая' },
  { value: 'force', content: 'Силовая' },
  { value: 'grid', content: 'Сетка' },
  { value: 'radial', content: 'Радиальная' },
  { value: 'dagre', content: 'Dagre' },
  { value: 'random', content: 'Случайная' },
  { value: 'concentric', content: 'Концентрическая' },
  { value: 'fruchterman', content: 'Фрухтерман' },
  { value: 'comboForce', content: 'Силовая группировка' },
];

interface FeatureGraphProps {
  onClose?: () => void;
  onFeatureSelected?: (featureCode: string) => void;
  data: FeatureRelations;
}

export const FeatureGraph: FC<FeatureGraphProps> = (props) => {
  const { onClose, onFeatureSelected, data } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const [layout, setLayout] = useState('graphin-force');
  const [showAttributes, setShowAttributes] = useState(false);

  const graphContainerRef = useRef<HTMLDivElement>(null);

  const displayData = {
    nodes: data.nodes,
    edges: data.edges,
  };

  if (!showAttributes) {
    displayData.nodes = data.nodes.filter(node => node.id.startsWith('feature:'));
    displayData.edges = data.edges.filter(edge => edge.source.startsWith('feature:') && edge.target.startsWith('feature:'));
  }

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const defaultBehaviours = isLoaded ?
    <>
      <DragCanvas />
      <ZoomCanvas />
      <DragNode />
      <ClickSelect />
      <Hoverable />
      <ResizeCanvas graphDOM={graphContainerRef.current as HTMLDivElement} />
      <ActivateRelations trigger="mouseenter" />
    </> : null;
  return <div className={bem()}>
    <div className={bem('GraphContainer')} ref={graphContainerRef}>
      <Graphin data={displayData} layout={{ type: layout }}>
        {defaultBehaviours}
        <SelectNodeBehaviour onNodeClick={onFeatureSelected}/>
      </Graphin>
    </div>
    <div className={bem('Controls')}>
      <Select options={LAYOUTS} onUpdate={([value]) => setLayout(value)} value={[layout]} />
      <Switch onUpdate={(value) => setShowAttributes(value)}>Атрибуты</Switch>
      {onClose ?
        <Button view="outlined" onClick={props.onClose}>Закрыть</Button> :
        null
      }
    </div>
  </div>;
};
