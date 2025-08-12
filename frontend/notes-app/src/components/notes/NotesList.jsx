import Note from "./Note";

const NotesList = ({ notesList, handleDeleteNote }) => {
  return (
    <>
      <h4>Notes List</h4>
      {notesList.map((note) => (
        <Note
          id={note.id}
          header={note.header}
          content={note.content}
          create_date={note.create_date}
          update_date={note.update_date}
          set_id={note.set_id}
          tags={note.tags}
          sources={note.sources}
          key={note.id}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </>
  );
};

export default NotesList;
