import Tag from "./Tag";

const TagsList = ({ tagsList, handleDeleteTag }) => {
  return (
    <>
      <h4>Tags List</h4>
      {tagsList.map((tag) => (
        <Tag
          id={tag.id}
          key={tag.id}
          name={tag.name}
          set_id={tag.set_id}
          handleDeleteTag={handleDeleteTag}
        />
      ))}
    </>
  );
};

export default TagsList;
