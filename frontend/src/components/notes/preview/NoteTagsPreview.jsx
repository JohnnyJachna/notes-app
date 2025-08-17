const NoteTagsPreview = ({ tags }) => {
  return (
    <>
      <p>Tags:</p>
      {tags && tags.length > 0 ? (
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag.id}>
                <p>{tag.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Click edit to add a tag</p>
      )}
    </>
  );
};

export default NoteTagsPreview;
