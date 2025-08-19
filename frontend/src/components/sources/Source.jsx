import React, { useState } from "react";

import { deleteSourceAtom } from "./SourcesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import SourceEditor from "./SourceEditor";

import { Button } from "flowbite-react";

const Source = (props) => {
  const source = useAtomValue(props.sourceAtom);
  const deleteSource = useSetAtom(deleteSourceAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteSource({ setID: source.set_id, sourceID: source.id });
  };

  return (
    <>
      <div className="flex flex-row gap-1">
        <p>{source.name}</p>
        <Button onClick={() => setShowEditor(true)} size="xs">
          ...
        </Button>
        <Button onClick={handleDeleteNote} size="xs" color="red">
          x
        </Button>
      </div>
      <SourceEditor
        sourceAtom={props.sourceAtom}
        open={showEditor}
        handleCloseEditor={handleCloseEditor}
      />
    </>
  );
};

export default React.memo(Source);
