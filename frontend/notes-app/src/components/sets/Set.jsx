import { useState } from "react";
import { Link } from "react-router";

import SetEditor from "./SetEditor";
import Button from "../Button";
import styles from "../css-modules/Set.module.css";

const Set = ({ id, handleDeleteSet }) => {
  const data = {
    id: id,
    name: "New Set",
  };

  const [showEditor, setShowEditor] = useState(false);
  const [setData, setSetData] = useState(data);

  const closeEditor = (value) => {
    setSetData(value);
    setShowEditor(false);
  };

  return (
    <div className={styles.set}>
      {showEditor ? (
        <SetEditor set={setData} closeEditor={closeEditor} />
      ) : (
        <>
          <Link to="/sets/editor" className={styles.link}>
            {setData.name}
          </Link>
          <Button
            type="button"
            name="edit"
            onClick={() => setShowEditor(true)}
          />
          <Button
            type="button"
            name="delete"
            onClick={() => handleDeleteSet(id)}
          />
        </>
      )}
    </div>
  );
};

export default Set;
