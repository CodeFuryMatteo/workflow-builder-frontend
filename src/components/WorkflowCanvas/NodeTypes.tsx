import { Handle, Position } from 'reactflow';
import { Box, Typography } from '@mui/material';
import { 
  PlayArrow as StartIcon,
  CheckBox as TaskIcon,
  Verified as ApprovalIcon,
  Schedule as DelayIcon,
  Stop as EndIcon 
} from '@mui/icons-material';

interface CustomNodeProps {
  data: {
    name: string;
    durationMs?: number;
    approvers?: string[];
  };
}

export const nodeTypes = {
  start: ({ data }: CustomNodeProps) => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#4caf50', 
      color: 'white', 
      borderRadius: 1, 
      display: 'flex', 
      alignItems: 'center',
      minWidth: 150
    }}>
      <StartIcon sx={{ mr: 1 }} />
      <Typography variant="body1">{data.name}</Typography>
      <Handle type="source" position={Position.Right} />
    </Box>
  ),
  task: ({ data }: CustomNodeProps) => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#2196f3', 
      color: 'white', 
      borderRadius: 1, 
      display: 'flex', 
      alignItems: 'center',
      minWidth: 150
    }}>
      <TaskIcon sx={{ mr: 1 }} />
      <Typography variant="body1">{data.name}</Typography>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Box>
  ),
  approval: ({ data }: CustomNodeProps) => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#9c27b0', 
      color: 'white', 
      borderRadius: 1, 
      display: 'flex', 
      alignItems: 'center',
      minWidth: 150
    }}>
      <ApprovalIcon sx={{ mr: 1 }} />
      <Box>
        <Typography variant="body1">{data.name}</Typography>
        {data.approvers && (
          <Typography variant="caption" display="block">
            Approvers: {data.approvers.join(', ')}
          </Typography>
        )}
      </Box>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Box>
  ),
  delay: ({ data }: CustomNodeProps) => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#ff9800', 
      color: 'white', 
      borderRadius: 1, 
      display: 'flex', 
      alignItems: 'center',
      minWidth: 150
    }}>
      <DelayIcon sx={{ mr: 1 }} />
      <Box>
        <Typography variant="body1">{data.name}</Typography>
        {data.durationMs && (
          <Typography variant="caption" display="block">
            Duration: {Math.floor(data.durationMs / 60000)} min
          </Typography>
        )}
      </Box>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Box>
  ),
  end: ({ data }: CustomNodeProps) => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#f44336', 
      color: 'white', 
      borderRadius: 1, 
      display: 'flex', 
      alignItems: 'center',
      minWidth: 150
    }}>
      <EndIcon sx={{ mr: 1 }} />
      <Typography variant="body1">{data.name}</Typography>
      <Handle type="target" position={Position.Left} />
    </Box>
  ),
};