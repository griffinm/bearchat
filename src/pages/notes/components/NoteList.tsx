import { format } from "date-fns";
import { Note } from "../../../utils/types";
import { Button, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
}

export function NoteList({
  notes,
  onNoteClick,
  onDeleteNote,
}: Props) {

  return (
    <Paper>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onClick={onNoteClick}
          onDelete={onDeleteNote}
        />
      ))}
    </Paper>
  )
}