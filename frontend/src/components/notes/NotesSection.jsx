import { useEffect } from "react";
import { useParams } from "react-router";

import {
  addNoteAtom,
  fetchNotesAtom,
  noteLoadingAtom,
  notesLoadedAtom,
} from "./NotesAtoms";
import { isDndActiveAtom } from "./dnd/DndAtoms";
import { useAtomValue, useSetAtom, useAtom } from "jotai/react";

import NotesListControls from "./list/NotesListControls";
import NotesList from "./list/NotesList";
import TagSourceEditor from "./TagSourceEditor";
import NoteSizeDropdown from "./list/NoteSizeDropdown";
import DndNotesList from "./dnd/DndNoteList";

import { Button, HR, Spinner } from "flowbite-react";

const NotesSection = () => {
  const { setID } = useParams();

  const addNote = useSetAtom(addNoteAtom);
  const fetchNotes = useSetAtom(fetchNotesAtom);
  const isLoading = useAtomValue(noteLoadingAtom);
  const notesLoaded = useAtomValue(notesLoadedAtom);
  const [isDndActive, setIsDndActive] = useAtom(isDndActiveAtom);

  useEffect(() => {
    if (notesLoaded) return;
    fetchNotes(setID);
  }, [setID, fetchNotes]);

  const handleAddNote = async () => {
    await addNote(setID);
  };

  const handleDndToggle = () => {
    setIsDndActive((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="m-3 p-5 xl:max-w-8/12 mx-auto">
          <div className="flex gap-3 justify-between flex-wrap">
            <div className="flex gap-3 mb-2">
              <Button color="green" onClick={handleAddNote}>
                Add Note
              </Button>
              <TagSourceEditor />
              <NoteSizeDropdown />
              <Button onClick={handleDndToggle} className="w-32">
                {isDndActive ? <span>Cancel</span> : <span>Custom Sort</span>}
              </Button>
            </div>
            <NotesListControls />
          </div>
          <HR className="!m-6" />
          {isDndActive ? <DndNotesList /> : <NotesList />}
        </div>
      )}
    </>
  );
};

export default NotesSection;
