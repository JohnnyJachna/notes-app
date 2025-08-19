import React, { useState } from "react";

import { deleteTagAtom } from "./TagsAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import TagEditor from "./TagEditor";

import { Button } from "flowbite-react";

const Tag = (props) => {
  const tag = useAtomValue(props.tagAtom);
  const deleteTag = useSetAtom(deleteTagAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteTag({ setID: tag.set_id, tagID: tag.id });
  };

  return (
    <>
      {showEditor ? (
        <TagEditor
          tagAtom={props.tagAtom}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <div className="flex flex-row gap-1">
          <p>{tag.name}</p>
          <Button onClick={() => setShowEditor(true)} size="xs">
            ...
          </Button>
          <Button onClick={handleDeleteNote} size="xs" color="red">
            x
          </Button>
        </div>
      )}
    </>
  );
};

export default React.memo(Tag);
