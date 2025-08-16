import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Box, 
  Button, 
  TextField, 
  Stack, 
  Chip, 
  Typography 
} from '@mui/material';
import { 
  PlayArrow as StartIcon,
  CheckBox as TaskIcon,
  Verified as ApprovalIcon,
  Schedule as DelayIcon,
  Stop as EndIcon 
} from '@mui/icons-material';
import { nodeTypes } from './NodeTypes';
import { Activity, WorkflowGraph } from '../../api/types';

interface WorkflowCanvasProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  activities: Activity[];
  onSave?: (graph: WorkflowGraph) => void;
  onUpdate?: (graph: WorkflowGraph) => void;
  isEditMode?: boolean;
  workflowName?: string;
  workflowDescription?: string;
  workflowTags?: string[];
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  initialNodes = [],
  initialEdges = [],
  activities,
  onSave,
  onUpdate,
  isEditMode = false,
  workflowName = '',
  workflowDescription = '',
  workflowTags = [],
}) => {
  const [name, setName] = useState(workflowName);
  const [description, setDescription] = useState(workflowDescription);
  const [tags, setTags] = useState<string[]>(workflowTags);
  const [tagInput, setTagInput] = useState('');
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const activity = activities.find((a) => a.type === type);

      if (!activity || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { name: activity.label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, activities, setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = () => {
    const graph: WorkflowGraph = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type || 'task',
        data: node.data as { name: string; durationMs?: number; approvers?: string[] },
        position: node.position,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })),
    };

    if (isEditMode && onUpdate) {
      onUpdate(graph);
    } else if (onSave) {
      onSave(graph);
    }
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, bgcolor: 'background.paper', mb: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                label="Add Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                size="small"
              />
              <Button variant="contained" onClick={handleAddTag}>
                Add
              </Button>
            </Stack>
            <Box sx={{ mt: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, height: 'calc(100% - 200px)' }}>
        <Box sx={{ width: 150, p: 2, bgcolor: 'background.paper', mr: 2, overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Activities</Typography>
          {activities.map((activity) => (
            <Box
              key={activity.type}
              sx={{
                p: 1,
                mb: 1,
                bgcolor: `${activity.color}.light`,
                color: `${activity.color}.contrastText`,
                borderRadius: 1,
                cursor: 'grab',
              }}
              draggable
              onDragStart={(event) => onDragStart(event, activity.type)}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {activity.type === 'start' && <StartIcon />}
                {activity.type === 'task' && <TaskIcon />}
                {activity.type === 'approval' && <ApprovalIcon />}
                {activity.type === 'delay' && <DelayIcon />}
                {activity.type === 'end' && <EndIcon />}
                <Typography variant="body2">{activity.label}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1, height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes as NodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Box>
      </Box>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={nodes.length === 0 || edges.length === 0}
        >
          {isEditMode ? 'Update Workflow' : 'Create Workflow'}
        </Button>
      </Box>
    </Box>
  );
};

export default WorkflowCanvas;