import { FeatureRelationEdge, FeatureRelationNode, FeatureRelations, TestResult } from '@/types';
import Graphin, { Behaviors } from '@antv/graphin';
import { cn } from '@bem-react/classname';
import { Button, Select, Switch, TextInput } from '@gravity-ui/uikit';
import { FC, useEffect, useRef, useState } from 'react';
import './FeatureGraph.css';
import { SelectNodeBehaviour } from './SelectNodeBehaviour';
import { testResultsToStyle } from '@/helpers/testResultToGraphinStyle';

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

const DEFAULT_DEPTH = 2;

function filterNodes(rootCode: string, depth: number, { nodes, edges }: FeatureRelations): FeatureRelations {
  if (depth <= 0) {
    return { nodes, edges };
  }
  const resultNodes = new Set<FeatureRelationNode>();
  const resultEdges = new Set<FeatureRelationEdge>();
  const root = nodes.find(node => node.code === rootCode);
  if (!root) {
    return {
      nodes: [], edges: []
    };
  }

  resultNodes.add(root);

  while (depth--) {
    const nodesToFind = [...resultNodes.keys()];
    for (const { code: sourceCode } of nodesToFind) {
      const edgeCode = `feature:${sourceCode}`;
      const codesToAttach = new Array<string>();

      edges.forEach(edge => {
        if (edge.source === edgeCode) {
          codesToAttach.push(edge.target);
          resultEdges.add(edge);
        }
        if (edge.target === edgeCode) {
          codesToAttach.push(edge.source);
          resultEdges.add(edge);
        }
      });


      codesToAttach.forEach(edgeCode => {
        if (edgeCode.startsWith('feature:')) {
          const code = edgeCode.slice(8);
          const found = nodes.find(node => node.nodeType === 'feature' && node.code === code);
          if (found) {
            resultNodes.add(found);
          }
          return;
        }
        if (edgeCode.startsWith('attribute-value:')) {
          const code = edgeCode.slice(16);
          const found = nodes.find(node => node.nodeType === 'attribute-value' && node.code === code);
          if (found) {
            resultNodes.add(found);
          }
          return;
        }
      });
    }
  }
  return {
    nodes: [...resultNodes.keys()],
    edges: [...resultEdges.keys()]
  };
}

interface FeatureGraphProps {
  onClose?: () => void;
  onFeatureSelected?: (featureCode: string) => void;
  data: FeatureRelations;
  testResults?: TestResult[];
  rootFeatureCode?: string;
}

export const FeatureGraph: FC<FeatureGraphProps> = (props) => {
  const { onClose, onFeatureSelected, data, testResults, rootFeatureCode } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [depth, setDepth] = useState(DEFAULT_DEPTH);

  const [layout, setLayout] = useState('graphin-force');
  const [showAttributes, setShowAttributes] = useState(false);

  const graphContainerRef = useRef<HTMLDivElement>(null);

  let displayData = data;
  if (rootFeatureCode) {
    displayData = filterNodes(rootFeatureCode, depth, data);
  }

  if (testResults) {
    displayData.nodes = displayData.nodes.map(node => testResultsToStyle(node, testResults));
  }

  if (!showAttributes) {
    displayData.nodes = displayData.nodes.filter(node => node.id.startsWith('feature:'));
    displayData.edges = displayData.edges.filter(edge => edge.source.startsWith('feature:') && edge.target.startsWith('feature:'));
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
        <SelectNodeBehaviour onNodeClick={onFeatureSelected} />
      </Graphin>
    </div>
    <div className={bem('Controls')}>
      <Select options={LAYOUTS} onUpdate={([value]) => setLayout(value)} value={[layout]} />
      <TextInput onUpdate={(value) => setDepth(Number(value))} value={depth.toString()} type="number" />
      <Switch onUpdate={(value) => setShowAttributes(value)}>Атрибуты</Switch>
      {onClose ?
        <Button view="outlined" onClick={props.onClose}>Закрыть</Button> :
        null
      }
    </div>
  </div>;
};
