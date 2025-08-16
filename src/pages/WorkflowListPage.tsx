import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import WorkflowList from '../components/WorkflowList';

const WorkflowListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = (workflow: any) => {
    navigate(`/edit/${workflow.id}`);
  };

  const handleView = (workflow: any) => {
    navigate(`/view/${workflow.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <WorkflowList onEdit={handleEdit} onView={handleView} />
    </Container>
  );
};

export default WorkflowListPage;