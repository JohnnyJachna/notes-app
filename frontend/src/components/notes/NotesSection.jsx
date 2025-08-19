import { useEffect } from "react";
import { useParams } from "react-router";

import { addNoteAtom, fetchNotesAtom } from "./NotesAtoms";
import { useSetAtom } from "jotai/react";

import NotesList from "./list/NotesList";
import { Button } from "flowbite-react";

const NotesSection = () => {
  const { setID } = useParams();

  const addNote = useSetAtom(addNoteAtom);
  const fetchNotes = useSetAtom(fetchNotesAtom);

  useEffect(() => {
    fetchNotes(setID);
  }, [setID, fetchNotes]);

  const handleAddNote = async () => {
    await addNote(setID);
  };

  return (
    <div className="m-3 p-5 border-1 border-solid border-b-gray-400 rounded-lg">
      <Button color="green" onClick={handleAddNote} className="mb-2">
        Add Note
      </Button>
      <NotesList />
    </div>
  );
};

export default NotesSection;
