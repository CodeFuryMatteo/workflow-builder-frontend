import { styled } from '@mui/material/styles';

export const CanvasContainer = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const ActivityPalette = styled('div')(({ theme }) => ({
  width: 150,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  marginRight: theme.spacing(2),
  overflowY: 'auto',
}));

export const FlowContainer = styled('div')({
  flexGrow: 1,
  height: '100%',
});

export const FormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
}));

export {};