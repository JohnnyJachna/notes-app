import Tag from "./Tag";

const TagsList = ({ tagsList }) => {
  return (
    <>
      <h4>Tags List</h4>
      {tagsList.map((tag) => (
        <Tag id={tag.id} key={tag.id} />
      ))}
    </>
  );
};

export default TagsList;
