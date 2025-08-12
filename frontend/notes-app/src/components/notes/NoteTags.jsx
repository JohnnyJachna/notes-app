import Button from "../Button";

const NoteTags = ({ tags, editable, removeTag }) => {
  return (
    <>
      <p>Tags:</p>
      {tags && tags.length > 0 ? (
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag.id}>
                <p>{tag.name}</p>
                {editable && (
                  <Button
                    type="button"
                    name="Remove"
                    onClick={() => removeTag(tag.id)}
                  />
                )}
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

export default NoteTags;
