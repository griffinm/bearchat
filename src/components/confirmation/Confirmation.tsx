import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message?: string;
  onConfirm: () => void;
}

export function Confirmation({
  open,
  setOpen,
  title,
  message,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <div className="px-5 pb-5">
        <Typography>{message}</Typography>
      </div>
      <div className="flex justify-center pb-4">
        <Button variant="contained" sx={{mr: 5}} onClick={() => setOpen(false)}>
          No
        </Button>
        <Button variant="contained" onClick={() => onConfirm()}>
          Yes
        </Button>
      </div>
    </Dialog>
  )
}