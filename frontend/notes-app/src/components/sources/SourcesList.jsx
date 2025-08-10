import Source from "./Source";

const SourcesList = ({ sourcesList, handleDeleteSource }) => {
  return (
    <>
      <h4>Sources List</h4>
      {sourcesList.map((source) => (
        <Source
          id={source.id}
          key={source.id}
          name={source.name}
          set_id={source.set_id}
          handleDeleteSource={handleDeleteSource}
        />
      ))}
    </>
  );
};

export default SourcesList;
