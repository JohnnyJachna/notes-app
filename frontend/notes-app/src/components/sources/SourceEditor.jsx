import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateSourceAtom } from "./SourcesAtoms";

import Button from "../Button";

const SourceEditor = ({ sourceAtom, handleCloseEditor }) => {
  const source = useAtomValue(sourceAtom);
  const updateSource = useSetAtom(updateSourceAtom);

  const [name, setName] = useState(source.name);

  const handleClick = async () => {
    if (name !== source.name) {
      const updatedSource = {
        ...source,
        name: name,
      };
      await updateSource(updatedSource);
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

export default SourceEditor;
