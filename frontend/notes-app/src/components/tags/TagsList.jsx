import React from "react";
import Tag from "./Tag";
import { splitTagsAtom } from "./TagsAtoms";
import { useAtom } from "jotai/react";

const TagsList = () => {
  const [tagsList] = useAtom(splitTagsAtom);

  return (
    <>
      <h4>Tags List</h4>
      {tagsList.map((singleTag) => (
        <Tag key={singleTag.toString()} tagAtom={singleTag} />
      ))}
    </>
  );
};

export default React.memo(TagsList);
