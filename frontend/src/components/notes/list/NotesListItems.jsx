import { useAtomValue } from "jotai";
import { refinedNotesSplitAtom } from "./NotesListAtoms";
import Note from "../Note";

const NotesListItems = () => {
  const noteAtoms = useAtomValue(refinedNotesSplitAtom);
  return (
    <div className="m-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {noteAtoms.map((noteAtom) => (
        <Note key={noteAtom.toString()} noteAtom={noteAtom} />
      ))}
    </div>
  );
};

export default NotesListItems;
