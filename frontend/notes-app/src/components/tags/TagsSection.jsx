import { useState } from "react";

import TagsList from "./TagsList";
import Button from "../Button";

let tagID = 0;

const TagsSection = () => {
  const [tagsList, setTagsList] = useState([]);

  const addTag = () => {
    const newTag = { id: tagID };
    const updatedTagsList = [...tagsList, newTag];

    setTagsList(updatedTagsList);
    tagID++;
  };

  const deleteTag = (id) => {
    const newTagsList = tagsList.filter((tag) => tag.id !== id);
    setTagsList(newTagsList);
  };

  return (
    <>
      <TagsList tagsList={tagsList} handleDeleteTag={deleteTag} />
      <Button type="button" name="Add Tag" onClick={addTag} />
    </>
  );
};

export default TagsSection;
