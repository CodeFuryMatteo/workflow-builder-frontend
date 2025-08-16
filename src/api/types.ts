export interface Activity {
  type: string;
  label: string;
  icon: string;
  color: string;
}

export interface NodeData {
  name: string;
  durationMs?: number;
  approvers?: string[];
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface WorkflowNode {
  id: string;
  type: string;
  data: NodeData;
  position: NodePosition;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface WorkflowMetadata {
  tags: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  graph: WorkflowGraph;
  metadata: WorkflowMetadata;
  status: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateWorkflowRequest {
  name: string;
  description: string;
  graph: WorkflowGraph;
  metadata: WorkflowMetadata;
  status: string;
}