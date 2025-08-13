import React, { useState } from "react";

import { deleteSourceAtom } from "./SourcesAtoms";
import { useAtom, useSetAtom } from "jotai/react";

import Button from "../Button";
import styles from "../css-modules/Source.module.css";
import SourceEditor from "./SourceEditor";

const Source = (props) => {
  const [source, setSources] = useAtom(props.sourceAtom);
  const deleteSource = useSetAtom(deleteSourceAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteSource(source);
  };

  return (
    <div className={styles.source}>
      {showEditor ? (
        <SourceEditor
          sourceAtom={props.sourceAtom}
          setSources={setSources}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <>
          <p>{source.name}</p>
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

export default React.memo(Source);
