import { useState } from "react";

import Button from "../Button";
import styles from "../css-modules/Tag.module.css";
import TagEditor from "./TagEditor";

const Tag = ({ id }) => {
  const data = {
    id: id,
    name: "New Tag",
  };

  const [showEditor, setShowEditor] = useState(false);
  const [tagData, setTagData] = useState(data);

  const closeEditor = (value) => {
    setTagData(value);
    setShowEditor(false);
  };

  return (
    <div className={styles.tag}>
      {showEditor ? (
        <TagEditor tag={tagData} closeEditor={closeEditor} />
      ) : (
        <>
          <p>{tagData.name}</p>
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

export default Tag;
