// import { useEffect } from "react";
import { useSets, useSetsDispatch } from "../../context/SetsContext";
import { useAPI } from "../../utils/api";

import SetsList from "./SetsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SetsSection = () => {
  const sets = useSets();
  const dispatch = useSetsDispatch();

  const { makeRequest } = useAPI();

  const handleAddSet = async () => {
    const date = new Date().toLocaleString();
    const body = {
      name: "New Set",
      create_date: date,
      update_date: date,
    };

    try {
      const addedSet = await makeRequest("sets/add", {
        method: "POST",
        body: JSON.stringify(body),
      });
      dispatch({ type: "set_added", addedSet });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSet = async (id) => {
    try {
      await makeRequest(`sets/${id}`, {
        method: "DELETE",
        body: id,
      });
      dispatch({ type: "set_deleted", id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sets.length > 0 && (
        <div className={styles.section}>
          <SetsList handleDeleteSet={handleDeleteSet} />
          <Button type="button" name="Add Set" onClick={handleAddSet} />
        </div>
      )}
    </>
  );
};

export default SetsSection;
