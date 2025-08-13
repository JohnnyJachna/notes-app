import { useEffect } from "react";
// import { useAPI } from "../../utils/api";
import { loadableSetsAtom, fetchSetsAtom, addSetAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";

import SetsList from "./SetsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SetsSection = () => {
  // const { makeRequest } = useAPI();

  const [, fetchList] = useAtom(fetchSetsAtom);
  const [, addSet] = useAtom(addSetAtom);
  const [loadableSets] = useAtom(loadableSetsAtom);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleAddSet = async () => {
    const date = new Date().toLocaleString();
    const body = {
      name: "New Set",
      create_date: date,
      update_date: date,
    };
    await addSet(body);
  };

  // const deleteSet = async (id) => {
  //   // try {
  //   //   await makeRequest(`sets/${id}`, {
  //   //     method: "DELETE",
  //   //     body: id,
  //   //   });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  return (
    <>
      {loadableSets.state === "hasData" && (
        <div className={styles.section}>
          <SetsList />
          <Button type="button" name="Add Set" onClick={handleAddSet} />
        </div>
      )}
    </>
  );
};

export default SetsSection;
