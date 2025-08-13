import React, { useState } from "react";

import { deleteTagAtom } from "./TagsAtoms";
import { useAtom, useSetAtom } from "jotai/react";

import Button from "../Button";
import styles from "../css-modules/Tag.module.css";
import TagEditor from "./TagEditor";

const Tag = (props) => {
  const [tag, setTags] = useAtom(props.tagAtom);
  const deleteTag = useSetAtom(deleteTagAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteTag(tag);
  };

  return (
    <div className={styles.tag}>
      {showEditor ? (
        <TagEditor
          tagAtom={props.tagAtom}
          setTags={setTags}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <>
          <p>{tag.name}</p>
          <Button
            type="button"
            name="edit"
            onClick={() => setShowEditor(true)}
          />
          <Button type="button" name="delete" onClick={handleDeleteNote} />
        </>
      )}
    </div>
  );
};

export default React.memo(Tag);
