import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateSetAtom } from "./SetsAtoms";
import { Button, TextInput } from "flowbite-react";

const SetEditor = ({ setAtom, handleCloseEditor }) => {
  const set = useAtomValue(setAtom);
  const updateSet = useSetAtom(updateSetAtom);

  const [name, setName] = useState(set.name);

  const handleClick = async () => {
    if (name !== set.name) {
      const updatedSet = {
        ...set,
        name: name,
      };
      await updateSet(updatedSet);
    }
    handleCloseEditor(name);
  };

  return (
    <div className="reset-styles">
      <div className="flex flex-row gap-1">
        <TextInput
          id="SetNameEditor"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextInput>
        <Button onClick={handleClick}>Done</Button>
      </div>
    </div>
  );
};

export default SetEditor;
