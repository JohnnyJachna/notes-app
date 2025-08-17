import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateSetAtom } from "./SetsAtoms";
import Button from "../Button";

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

export default SetEditor;
