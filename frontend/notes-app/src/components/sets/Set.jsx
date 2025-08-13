import React, { useState } from "react";
import { Link } from "react-router";
import { deleteSetAtom } from "./SetsAtoms";
import { useAtom, useSetAtom } from "jotai/react";

import SetEditor from "./SetEditor";
import Button from "../Button";
import styles from "../css-modules/Set.module.css";

const Set = (props) => {
  const [set, setSet] = useAtom(props.setAtom);
  const deleteSet = useSetAtom(deleteSetAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteSet = async () => {
    await deleteSet(set.id);
  };

  return (
    <div className={styles.set}>
      {showEditor ? (
        <SetEditor
          setAtom={props.setAtom}
          setSet={setSet}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <>
          <Link to={`/sets/${set.id}`} className={styles.link}>
            {set.name}
          </Link>
          <Button
            type="button"
            name="edit"
            onClick={() => setShowEditor(true)}
          />
          <Button type="button" name="delete" onClick={handleDeleteSet} />
        </>
      )}
    </div>
  );
};

export default React.memo(Set);
