import { useState, useCallback } from 'react';

import { useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const initialNodes: Node[] = [
  { id: '1', type: 'input', hidden: true, data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', hidden: true, data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', hidden: true, data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', hidden: true, data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

const setHidden = (hidden: boolean) => (els: any[]) =>
  els.map((e: any) => {
    e.hidden = hidden;
    return e;
  });

const HiddenFlow = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const [isHidden, setIsHidden] = useState<boolean>(true);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  useEffect(() => {
    setNodes(setHidden(isHidden));
    setEdges(setHidden(isHidden));
  }, [isHidden]);

  return (
    <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect}>
      <MiniMap />
      <Controls />

      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <div>
          <label htmlFor="ishidden">
            isHidden
            <input
              id="ishidden"
              type="checkbox"
              checked={isHidden}
              onChange={(event) => setIsHidden(event.target.checked)}
              className="react-flow__ishidden"
            />
          </label>
        </div>
      </div>
    </ReactFlow>
  );
};

export default HiddenFlow;
