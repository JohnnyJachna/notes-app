import { useState } from "react";

import Button from "../Button";
import styles from "../css-modules/Source.module.css";
import SourceEditor from "./SourceEditor";

const Source = ({ id }) => {
  const data = {
    id: id,
    name: "New Source",
  };

  const [showEditor, setShowEditor] = useState(false);
  const [sourceData, setSourceData] = useState(data);

  const closeEditor = (value) => {
    setSourceData(value);
    setShowEditor(false);
  };

  return (
    <div className={styles.source}>
      {showEditor ? (
        <SourceEditor tag={sourceData} closeEditor={closeEditor} />
      ) : (
        <>
          <p>{sourceData.name}</p>
          <Button
            type="button"
            name="edit"
            onClick={() => setShowEditor(true)}
          />
        </>
      )}
    </div>
  );
};

export default Source;
