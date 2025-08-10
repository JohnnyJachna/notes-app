// import NoteHeader from "./NoteHeader";
// import NoteSources from "./NoteSources";
// import NoteTags from "./NoteTags";
// import NoteDate from "./NoteDate";

const NotePreview = ({ data }) => {
  return (
    <>
      <p>Header: {data.header}</p>
      <p>Sources: {data.sources}</p>
      <p>Tags: {data.tags}</p>
      <p>Last Edit: {data.update_date}</p>
    </>
  );
};

export default NotePreview;
