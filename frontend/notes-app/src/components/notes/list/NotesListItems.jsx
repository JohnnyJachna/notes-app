import Note from "../Note";

const NotesListItems = ({ sortedNoteAtoms, sortedNotes }) => (
  <>
    {sortedNoteAtoms.map((noteAtom, idx) => (
      <Note key={sortedNotes[idx].id} noteAtom={noteAtom} />
    ))}
  </>
);

export default NotesListItems;
