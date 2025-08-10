import { useState } from "react";

import Button from "../Button";
import styles from "../css-modules/Source.module.css";
import SourceEditor from "./SourceEditor";

const Source = (props) => {
  const data = {
    id: props.id,
    name: props.name,
    set_id: props.set_id,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [sourceData, setSourceData] = useState(data);

  const closeEditor = (updatedName) => {
    setSourceData({
      ...sourceData,
      name: updatedName,
    });
    setShowEditor(false);
  };

  return (
    <div className={styles.source}>
      {showEditor ? (
        <SourceEditor source={sourceData} closeEditor={closeEditor} />
      ) : (
        <>
          <p>{sourceData.name}</p>
          <Button
            type="button"
            name="edit"
            onClick={() => setShowEditor(true)}
          />
          <Button
            type="button"
            name="delete"
            onClick={() => props.handleDeleteSource(sourceData.id)}
          />
        </>
      )}
    </div>
  );
};

export default Source;
