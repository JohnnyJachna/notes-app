import { useState } from "react";
import { useParams, Link } from "react-router";

import SetEditor from "./SetEditor";
import Button from "../Button";
import styles from "../css-modules/Set.module.css";

const Set = (props) => {
  const data = {
    id: props.id,
    name: props.name,
    create_date: props.create_date,
    update_date: props.update_date,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [setData, setSetData] = useState(data);

  let { setID } = useParams();
  setID = setData.id;

  const closeEditor = (updatedName) => {
    setSetData({
      ...setData,
      name: updatedName,
    });
    setShowEditor(false);
  };

  return (
    <div className={styles.set}>
      {showEditor ? (
        <SetEditor set={setData} closeEditor={closeEditor} />
      ) : (
        <>
          <Link to={`/sets/${setID}`} className={styles.link}>
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
            onClick={() => props.handleDeleteSet(setData.id)}
          />
        </>
      )}
    </div>
  );
};

export default Set;
