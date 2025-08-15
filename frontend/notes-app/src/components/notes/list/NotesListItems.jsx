import { useAtomValue } from "jotai";
import { refinedNotesAtom, refinedNotesSplitAtom } from "./NotesListAtoms";
import Note from "../Note";

const NotesListItems = () => {
  const refinedNotes = useAtomValue(refinedNotesAtom);
  const refinedNotesSplit = useAtomValue(refinedNotesSplitAtom);
  return (
    <>
      {refinedNotesSplit.map((noteAtom, idx) => (
        <Note key={refinedNotes[idx].id} noteAtom={noteAtom} />
      ))}
    </>
  );
};

export default NotesListItems;
