import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from './components/AppBar';
import WorkflowListPage from './pages/WorkflowListPage';
import CreateWorkflowPage from './pages/CreateWorkflowPage';
import EditWorkflowPage from './pages/EditWorkflowPage';
import ViewWorkflowPage from './pages/ViewWorkflowPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<WorkflowListPage />} />
          <Route path="/create" element={<CreateWorkflowPage />} />
          <Route path="/edit/:id" element={<EditWorkflowPage />} />
          <Route path="/view/:id" element={<ViewWorkflowPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;