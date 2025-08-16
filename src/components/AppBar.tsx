import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomAppBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Workflow Builder
        </Typography>
        <Button color="inherit" component={Link} to="/">
          All Workflows
        </Button>
        <Button color="inherit" component={Link} to="/create">
          Create Workflow
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;