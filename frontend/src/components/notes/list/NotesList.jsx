import { useAtomValue } from "jotai";
import { refinedNotesSplitAtom } from "./NotesListAtoms";
import Note from "../Note";

const NotesList = () => {
  const noteAtoms = useAtomValue(refinedNotesSplitAtom);
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {noteAtoms.map((noteAtom) => (
        <Note key={noteAtom.toString()} noteAtom={noteAtom} />
      ))}
    </div>
  );
};

export default NotesList;
