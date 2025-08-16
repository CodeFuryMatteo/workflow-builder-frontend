import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Activity Types
export interface Activity {
  type: string;
  label: string;
  icon: string;
  color: string;
}

// Workflow Node Types
interface NodeData {
  name: string;
  durationMs?: number;
  approvers?: string[];
}

interface WorkflowNode {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowMetadata {
  tags: string[];
}

// Main Workflow Interface
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

// API Functions
export const fetchActivities = async (): Promise<Activity[]> => {
  const response = await api.get('/workflows/catalog/activities');
  return response.data;
};

export const fetchWorkflows = async (): Promise<Workflow[]> => {
  const response = await api.get('/workflows');
  return response.data;
};

export const fetchWorkflow = async (id: string): Promise<Workflow> => {
  const response = await api.get(`/workflows/${id}`);
  return response.data;
};

export const createWorkflow = async (workflow: CreateWorkflowRequest): Promise<Workflow> => {
  const response = await api.post('/workflows', workflow);
  return response.data;
};

export const updateWorkflow = async (id: string, workflow: Partial<CreateWorkflowRequest>): Promise<Workflow> => {
  const response = await api.patch(`/workflows/${id}`, workflow);
  return response.data;
};

export const deleteWorkflow = async (id: string): Promise<void> => {
  await api.delete(`/workflows/${id}`);
};