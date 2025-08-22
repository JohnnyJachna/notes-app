import { useEffect } from "react";
import { useParams } from "react-router";

import {
  addNoteAtom,
  fetchNotesAtom,
  noteLoadingAtom,
  notesLoadedAtom,
} from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotesListControls from "./list/NotesListControls";
import NotesList from "./list/NotesList";
import TagSourceEditor from "./TagSourceEditor";
import NoteSizeDropdown from "./list/NoteSizeDropdown";

import { Button, HR, Spinner } from "flowbite-react";

const NotesSection = () => {
  const { setID } = useParams();

  const addNote = useSetAtom(addNoteAtom);
  const fetchNotes = useSetAtom(fetchNotesAtom);
  const isLoading = useAtomValue(noteLoadingAtom);
  const notesLoaded = useAtomValue(notesLoadedAtom);

  useEffect(() => {
    if (notesLoaded) return;
    fetchNotes(setID);
  }, [setID, fetchNotes]);

  const handleAddNote = async () => {
    await addNote(setID);
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="m-3 p-5 max-w-8/12 mx-auto">
          <div className="flex gap-3 justify-between flex-wrap">
            <div className="flex gap-3">
              <Button color="green" onClick={handleAddNote} className="mb-2">
                Add Note
              </Button>
              <TagSourceEditor />
              <NoteSizeDropdown />
            </div>
            <NotesListControls />
          </div>
          <HR className="!m-6" />
          <NotesList />
        </div>
      )}
    </>
  );
};

export default NotesSection;
