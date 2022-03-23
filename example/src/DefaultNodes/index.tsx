import ReactFlow, {
  useReactFlow,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  ReactFlowProvider,
} from 'react-flow-renderer';

const defaultNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, className: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, className: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, className: 'light' },
];

const defaultEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const defaultEdgeOptions = {
  animated: true,
};

const DefaultNodes = () => {
  const instance = useReactFlow();

  const logToObject = () => console.log(instance.toObject());
  const resetTransform = () => instance.setViewport({ x: 0, y: 0, zoom: 1 });

  const updateNodePositions = () => {
    instance.setNodes((nodes) =>
      nodes.map((node) => {
        node.position = {
          x: Math.random() * 400,
          y: Math.random() * 400,
        };

        return node;
      })
    );
  };

  const updateEdgeColors = () => {
    instance.setEdges((edges) =>
      edges.map((edge) => {
        edge.style = {
          stroke: '#ff5050',
        };

        return edge;
      })
    );
  };

  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} defaultEdgeOptions={defaultEdgeOptions} fitView>
      <Background variant={BackgroundVariant.Lines} />

      <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 4 }}>
        <button onClick={resetTransform} style={{ marginRight: 5 }}>
          reset transform
        </button>
        <button onClick={updateNodePositions} style={{ marginRight: 5 }}>
          change pos
        </button>
        <button onClick={updateEdgeColors} style={{ marginRight: 5 }}>
          red edges
        </button>
        <button onClick={logToObject}>toObject</button>
      </div>
    </ReactFlow>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <DefaultNodes />
    </ReactFlowProvider>
  );
}
