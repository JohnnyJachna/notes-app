import React, { useState } from "react";

import { deleteSourceAtom } from "./SourcesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import SourceEditor from "./SourceEditor";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

import { HR } from "flowbite-react";

const Source = (props) => {
  const source = useAtomValue(props.sourceAtom);
  const deleteSource = useSetAtom(deleteSourceAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteSource = async () => {
    await deleteSource({ setID: source.set_id, sourceID: source.id });
  };

  return (
    <>
      <HR className="!m-0" />
      <div className="flex flex-row gap-1 justify-between group">
        <h5
          ittle={source.name}
          className="truncate pr-16 relative h10 flex items-center"
        >
          {source.name}
        </h5>
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
          <ButtonEdit onClick={() => setShowEditor(true)} />
          <ButtonDelete onClick={handleDeleteSource} />
        </div>
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
