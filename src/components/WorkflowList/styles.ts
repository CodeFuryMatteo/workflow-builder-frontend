import { styled } from '@mui/material/styles';

export const TableContainerStyled = styled('div')({
  marginTop: 16,
  marginBottom: 16,
});

export const ActionsCell = styled('div')({
  display: 'flex',
  gap: 8,
});

export const DialogContentStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const DialogActionsStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  justifyContent: 'flex-end',
}));

export {};