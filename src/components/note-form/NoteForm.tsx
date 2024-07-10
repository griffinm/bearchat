import { useEffect, useState } from "react";
import { Note } from "../../utils/types";
import { Button, Input, TextField } from "@mui/material";
import Editor from 'react-simple-wysiwyg';
import DeleteIcon from '@mui/icons-material/Delete';
import { Confirmation } from "../confirmation/Confirmation";

const SAVE_TIMEOUT = 500;

interface Props {
  note: Note,
  onSave: (note: Note) => void,
  onDelete: (note: Note) => void,
}

export function NoteForm({
  note,
  onSave,
  onDelete,
}: Props) {
  const [title, setTitle] = useState<string>(note.title || "")
  const [content, setContent] = useState<string>(note.content)
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

  useEffect(() => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    const timeout = setTimeout(() => {
      onSave({
        ...note,
        title,
        content,
      })
    }, SAVE_TIMEOUT)

    setSaveTimeout(timeout)

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }
    }
  }, [title, content])

  return (
    <div className="flex flex-col grow">
      <div className="flex">
        <div className="flex-1">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            fullWidth
            variant="standard"
            inputProps={{style: {fontSize: 30}}}
          />
        </div>
        <div className="flex align-middle justify-center">
          <Button onClick={() => setShowDeleteConfirm(true)} color="error">
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className="grow h-[600px] pt-5">
        <Editor
          className="h-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <Confirmation
        open={showDeleteConfirm}
        setOpen={setShowDeleteConfirm}
        title="Delete note"
        message="Are you sure you want to delete this note?"
        onConfirm={() => onDelete(note)}
      />

    </div>
  )
}