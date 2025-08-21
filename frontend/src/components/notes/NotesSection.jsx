import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import {
  addNoteAtom,
  fetchNotesAtom,
  noteLoadingAtom,
  notesLoadedAtom,
} from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotesList from "./list/NotesList";
import TagSourceEditor from "./TagSourceEditor";

import { Button, Spinner } from "flowbite-react";

const NotesSection = () => {
  const { setID } = useParams();
  const navigate = useNavigate();

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

  const navToDnd = () => {
    navigate(`/sets/${setID}/dnd`);
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="m-3 p-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <TagSourceEditor />
              <Button color="green" onClick={handleAddNote} className="mb-2">
                Add Note
              </Button>
            </div>
            <Button onClick={navToDnd}>Editor</Button>
          </div>
          <NotesList />
        </div>
      )}
    </>
  );
};

export default NotesSection;
