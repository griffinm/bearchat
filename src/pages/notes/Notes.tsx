import { useEffect, useMemo, useState } from "react";
import { Note } from "../../utils/types";
import { createNote, deleteNote, fetchNotes } from "../../utils/ApiClient";
import { LoadingSpinner } from "../../components/loading-spinner";
import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { urls } from "../../utils/urls";
import { NoteList } from "./components/NoteList";

export function Notes() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)

    fetchNotes()
      .then((response) => {
        setNotes(response.data);
        setLoading(false)
      });
  }, []);

  const sortedNotes = useMemo(() => {
    return notes.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [notes])

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  const onNewNote = () => {
    createNote().then((response) => {
      const noteId = response.data.id;
      navigate(urls.note.url(noteId))
    })
  }

  const onDeleteNote = (note: Note) => {
    setNotes(notes.filter((n) => n.id !== note.id))
    deleteNote(note)
  }

  return (
    <div>
      <div className="flex justify-between m-4 max-w-[600px] md:pt-5 md:flex-col">
        <div>
          <Typography variant="h4">Notes</Typography>
        </div>
        <div className="md:pt-5">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onNewNote}
          >
            Create
          </Button>
        </div>

      </div>
      <NoteList
        notes={sortedNotes} 
        onNoteClick={(note) => navigate(urls.note.url(note.id))}
        onDeleteNote={onDeleteNote}
      />
    </div>
  )
}