import { MouseEvent } from 'react';
import ReactFlow, { addEdge, Node, Connection, Edge, useNodesState, useEdgesState } from 'react-flow-renderer';

const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onNodeClick = (_: MouseEvent, node: Node) => console.log('click', node);

const nodesA: Node[] = [
  { id: '1a', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, className: 'light' },
  { id: '2a', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, className: 'light' },
  { id: '3a', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4a', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, className: 'light' },
];

const edgesA: Edge[] = [
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
];

const nodesB: Node[] = [
  { id: 'inputb', type: 'input', data: { label: 'Input' }, position: { x: 300, y: 5 }, className: 'light' },
  { id: '1b', data: { label: 'Node 1' }, position: { x: 0, y: 100 }, className: 'light' },
  { id: '2b', data: { label: 'Node 2' }, position: { x: 200, y: 100 }, className: 'light' },
  { id: '3b', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4b', data: { label: 'Node 4' }, position: { x: 600, y: 100 }, className: 'light' },
];

const edgesB: Edge[] = [
  { id: 'e1b', source: 'inputb', target: '1b' },
  { id: 'e2b', source: 'inputb', target: '2b' },
  { id: 'e3b', source: 'inputb', target: '3b' },
  { id: 'e4b', source: 'inputb', target: '4b' },
];

const BasicFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesA);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesA);

  const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
    >
      <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 4 }}>
        <button
          onClick={() => {
            setNodes(nodesA);
            setEdges(edgesA);
          }}
          style={{ marginRight: 5 }}
        >
          flow a
        </button>
        <button
          onClick={() => {
            setNodes(nodesB);
            setEdges(edgesB);
          }}
        >
          flow b
        </button>
      </div>
    </ReactFlow>
  );
};

export default BasicFlow;
