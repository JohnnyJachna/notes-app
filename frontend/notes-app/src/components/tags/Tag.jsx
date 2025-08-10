import { useState } from "react";

import Button from "../Button";
import styles from "../css-modules/Tag.module.css";
import TagEditor from "./TagEditor";

const Tag = (props) => {
  const data = {
    id: props.id,
    name: props.name,
    set_id: props.set_id,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [tagData, setTagData] = useState(data);

  const closeEditor = (updatedName) => {
    setTagData({
      ...tagData,
      name: updatedName,
    });
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
          <Button
            type="button"
            name="delete"
            onClick={() => props.handleDeleteTag(tagData.id)}
          />
        </>
      )}
    </div>
  );
};

export default Tag;
