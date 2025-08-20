import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateTagAtom } from "./TagsAtoms";

import ButtonColorToggle from "../buttons/ButtonColorToggle";
import ColorPicker from "../ColorPicker";

import { Button, TextInput } from "flowbite-react";

const TagEditor = ({ tagAtom, handleCloseEditor }) => {
  const tag = useAtomValue(tagAtom);
  const updateTag = useSetAtom(updateTagAtom);

  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);

  const handleClick = async () => {
    if (name !== tag.name || color !== tag.color) {
      await updateTag({
        setID: tag.set_id,
        tagID: tag.id,
        name,
        color,
      });
    }
    handleCloseEditor();
  };

  return (
    <div className="flex flex-col gap-1 items-center mb-3">
      <div className="flex flex-row gap-1 items-center">
        <TextInput
          id="TagNameEditor"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextInput>
        <ButtonColorToggle onClick={setShowPicker} />
        <Button onClick={handleClick} size="sm">
          Done
        </Button>
      </div>
      {showPicker && <ColorPicker value={color} onChange={setColor} />}
    </div>
  );
};

export default TagEditor;
