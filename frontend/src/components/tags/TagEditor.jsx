import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateTagAtom } from "./TagsAtoms";

import Button from "../Button";

const TagEditor = ({ tagAtom, handleCloseEditor }) => {
  const tag = useAtomValue(tagAtom);
  const updateTag = useSetAtom(updateTagAtom);

  const [name, setName] = useState(tag.name);

  const handleClick = async () => {
    if (name !== tag.name) {
      await updateTag({ setID: tag.set_id, tagID: tag.id, name: name });
    }
    handleCloseEditor();
  };

  return (
    <>
      <textarea
        id="Name"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <Button type="button" name="Done" onClick={handleClick} />
    </>
  );
};

export default TagEditor;
