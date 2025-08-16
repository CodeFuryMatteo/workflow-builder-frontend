import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { fetchWorkflows, deleteWorkflow } from '../../api/workflowApi';
import { Workflow } from '../../api/types';

interface WorkflowListProps {
  onEdit: (workflow: Workflow) => void;
  onView: (workflow: Workflow) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ onEdit, onView }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const loadWorkflows = async () => {
      const data = await fetchWorkflows();
      setWorkflows(data);
    };
    loadWorkflows();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteWorkflow(deleteId);
      setWorkflows(workflows.filter((w) => w.id !== deleteId));
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>{workflow.name}</TableCell>
                <TableCell>{workflow.description}</TableCell>
                <TableCell>{workflow.status}</TableCell>
                <TableCell>{workflow.version}</TableCell>
                <TableCell>{new Date(workflow.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View">
                      <IconButton onClick={() => onView(workflow)}>
                        <Visibility color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => onEdit(workflow)}>
                        <Edit color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteClick(workflow.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Workflow</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this workflow? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkflowList;