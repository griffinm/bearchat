import { Button, Typography } from "@mui/material";
import { Note } from "../../../utils/types";
import { format } from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import { Confirmation } from "../../../components/confirmation/Confirmation";
import { useState } from "react";

interface Props {
  note: Note;
  onClick: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function NoteItem({
  note,
  onClick,
  onDelete,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <div 
        className="border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
      >
        <div className="flex">
          <div className="p-5 grow" onClick={() => onClick(note)}>
            <Typography variant="h5">
              {note.title}
            </Typography>
            <div className="pt-2">
              Updated: {format(new Date(note.updatedAt.toString()), 'dd/MM/yyyy')}
            </div>
          </div>

          <div className="flex justify-center align-middle">
            <Button
              variant="text"
              color="error"
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>

        <Confirmation
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title="Delete note"
          message="Are you sure you want to delete this note?"
          onConfirm={() => onDelete(note)}
        />

      </div>
  )
}