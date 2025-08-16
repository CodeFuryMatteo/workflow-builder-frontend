import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import WorkflowCanvas from '../components/WorkflowCanvas';
import { fetchActivities, fetchWorkflow } from '../api/workflowApi';
import { Activity, Workflow } from '../api/types';

const ViewWorkflowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);

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

  if (!workflow) return <div>Loading...</div>;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WorkflowCanvas
        activities={activities}
        initialNodes={workflow.graph.nodes}
        initialEdges={workflow.graph.edges}
        isEditMode={false}
        workflowName={workflow.name}
        workflowDescription={workflow.description}
        workflowTags={workflow.metadata.tags}
      />
    </Box>
  );
};

export default ViewWorkflowPage;