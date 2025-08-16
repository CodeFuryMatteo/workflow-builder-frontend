import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import WorkflowCanvas from '../components/WorkflowCanvas';
import { fetchActivities, fetchWorkflow, updateWorkflow } from '../api/workflowApi';
import { Activity, Workflow, WorkflowGraph } from '../api/types';

const EditWorkflowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [activitiesData, workflowData] = await Promise.all([
        fetchActivities(),
        fetchWorkflow(id!),
      ]);
      setActivities(activitiesData);
      setWorkflow(workflowData);
    };
    loadData();
  }, [id]);

  const handleUpdate = async (graph: WorkflowGraph) => {
    if (!workflow) return;

    const updatedWorkflow = {
      name: workflow.name,
      description: workflow.description,
      graph,
      metadata: workflow.metadata,
      status: workflow.status,
    };

    await updateWorkflow(workflow.id, updatedWorkflow);
    navigate(`/view/${workflow.id}`);
  };

  if (!workflow) return <div>Loading...</div>;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WorkflowCanvas
        activities={activities}
        initialNodes={workflow.graph.nodes}
        initialEdges={workflow.graph.edges}
        onUpdate={handleUpdate}
        isEditMode={true}
        workflowName={workflow.name}
        workflowDescription={workflow.description}
        workflowTags={workflow.metadata.tags}
      />
    </Box>
  );
};

export default EditWorkflowPage;