import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import WorkflowCanvas from '../components/WorkflowCanvas';
import { fetchActivities, createWorkflow } from '../api/workflowApi';
import { Activity, WorkflowGraph } from '../api/types';

const CreateWorkflowPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    loadActivities();
  }, []);

  const handleSave = async (graph: WorkflowGraph) => {
    const workflow = {
      name: `New Workflow ${new Date().toLocaleString()}`,
      description: 'A new workflow',
      graph,
      metadata: { tags: [] },
      status: 'draft',
    };

    const createdWorkflow = await createWorkflow(workflow);
    navigate(`/view/${createdWorkflow.id}`);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WorkflowCanvas activities={activities} onSave={handleSave} />
    </Box>
  );
};

export default CreateWorkflowPage;