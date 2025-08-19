import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateTagAtom } from "./TagsAtoms";

import { Button, TextInput } from "flowbite-react";

const TagEditor = ({ tagAtom, handleCloseEditor }) => {
  const tag = useAtomValue(tagAtom);
  const updateTag = useSetAtom(updateTagAtom);

  const [name, setName] = useState(tag.name);

  const handleClick = async () => {
    if (name !== tag.name) {
      await updateTag({
        setID: tag.set_id,
        tagID: tag.id,
        name: name,
        color: tag.color,
      });
    }
    handleCloseEditor();
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <TextInput
        id="TagNameEditor"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextInput>
      <Button onClick={handleClick} size="sm">
        Done
      </Button>
    </div>
  );
};

export default TagEditor;
