const NoteSourcesPreview = ({ sources }) => {
  return (
    <>
      <p>Sources:</p>
      {sources && sources.length > 0 ? (
        <ul>
          {sources.map((source) => {
            return (
              <li key={source.id}>
                <p>{source.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Click edit to add a source</p>
      )}
    </>
  );
};

export default NoteSourcesPreview;
