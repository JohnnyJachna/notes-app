import React, { useState } from "react";

import { deleteSourceAtom } from "./SourcesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import Button from "../Button";
import styles from "../css-modules/Source.module.css";
import { createPortal } from "react-dom";
import SourceEditor from "./SourceEditor";

const Source = (props) => {
  const source = useAtomValue(props.sourceAtom);
  const deleteSource = useSetAtom(deleteSourceAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteSource({ setID: source.set_id, tagID: source.id });
  };

  return (
    <div className={styles.source}>
      {showEditor &&
        createPortal(
          <SourceEditor
            sourceAtom={props.sourceAtom}
            handleCloseEditor={handleCloseEditor}
          />,
          document.body
        )}
      <>
        <p>{source.name}</p>
        <Button type="button" name="edit" onClick={() => setShowEditor(true)} />
        <Button type="button" name="delete" onClick={handleDeleteNote} />
      </>
    </div>
  );
};

export default React.memo(Source);
