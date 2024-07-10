import { useEffect, useState } from "react";
import { NoteForm } from "../../components/note-form/NoteForm"
import { Note } from "../../utils/types";
import { Link, useParams } from "react-router-dom";
import { deleteNote, fetchNote, updateNote } from "../../utils/ApiClient";
import { LoadingSpinner } from "../../components/loading-spinner";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import { urls } from "../../utils/urls";

export function NotePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return
    }

    fetchNote(id).then((response) => {
      setNote(response.data);
      setLoading(false);
    });
  }, [id]);

  const handleSave = (note: Note) => {
    updateNote(note).then(() => {
      setNote(note)
    })
  }

  const handleDelete = (note: Note) => {
    deleteNote(note).then(() => {
      navigate(urls.notes.url())
    })
  }

  if (loading || !note) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="pb-4">
        <Link to={urls.notes.url()}>
          <Button variant="text" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
        </Link>
      </div>
      <NoteForm note={note} onSave={handleSave} onDelete={handleDelete} />
    </div>
  )
}