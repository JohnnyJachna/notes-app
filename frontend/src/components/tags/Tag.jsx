import React, { useState } from "react";

import { deleteTagAtom } from "./TagsAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import TagEditor from "./TagEditor";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

import { HR } from "flowbite-react";

const Tag = (props) => {
  const tag = useAtomValue(props.tagAtom);
  const deleteTag = useSetAtom(deleteTagAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteTag = async () => {
    await deleteTag({ setID: tag.set_id, tagID: tag.id });
  };

  return (
    <>
      <HR className="!m-0" />
      {showEditor ? (
        <TagEditor
          tagAtom={props.tagAtom}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <div className="flex flex-row gap-1 justify-between group">
          <h5
            ittle={tag.name}
            className="font-semibold truncate pr-16 relative h10 flex items-center"
          >
            {tag.name}
          </h5>
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
            <ButtonEdit onClick={() => setShowEditor(true)} />
            <ButtonDelete onClick={handleDeleteTag} />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Tag);
