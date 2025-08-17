import { useAtomValue } from "jotai";
import { refinedNotesSplitAtom } from "./NotesListAtoms";
import Note from "../Note";

const NotesListItems = () => {
  const noteAtoms = useAtomValue(refinedNotesSplitAtom);
  return (
    <>
      {noteAtoms.map((noteAtom) => (
        <Note key={noteAtom.toString()} noteAtom={noteAtom} />
      ))}
    </>
  );
};

export default NotesListItems;
