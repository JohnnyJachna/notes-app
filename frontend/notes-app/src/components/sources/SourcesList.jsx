import Source from "./Source";

const SourcesList = ({ sourcesList }) => {
  return (
    <>
      <h4>Sources List</h4>
      {sourcesList.map((source) => (
        <Source id={source.id} key={source.id} />
      ))}
    </>
  );
};

export default SourcesList;
