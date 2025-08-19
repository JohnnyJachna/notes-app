import { useEffect } from "react";
import { useParams } from "react-router";

import { addNoteAtom, fetchNotesAtom } from "./NotesAtoms";
import { useSetAtom } from "jotai/react";

import NotesList from "./list/NotesList";
import TagSourceEditor from "./TagSourceEditor";

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
    <div className="m-3 p-5">
      <div className="flex flex-row gap-3">
        <TagSourceEditor />
        <Button color="green" onClick={handleAddNote} className="mb-2">
          Add Note
        </Button>
      </div>
      <NotesList />
    </div>
  );
};

export default NotesSection;
