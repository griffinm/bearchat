import { Note } from "../../../utils/types";
import { Paper } from "@mui/material";
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