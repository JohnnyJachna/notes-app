// import NoteHeader from "./NoteHeader";
// import NoteContent from "./NoteContent";
// import NoteSources from "./NoteSources";
// import NoteTags from "./NoteTags";
// import NoteDate from "./NoteDate";

const Note = ({ id }) => {
  const data = {
    id: id,
    header: "Header",
    content: "Content",
    sources: "Sources",
    tags: "Tags",
    date: "Date",
  };
  return (
    <div>
      <p>ID: {data.id}</p>
      <p>Header: {data.header}</p>
      <p>Content: {data.content}</p>
      <p>Sources: {data.sources}</p>
      <p>Tags: {data.tags}</p>
      <p>Date: {data.date}</p>
    </div>
  );
};

export default Note;
