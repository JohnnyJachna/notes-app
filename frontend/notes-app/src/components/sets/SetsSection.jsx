import { useEffect } from "react";
import { loadableSetsAtom, addSetAtom, setsAtom } from "./SetsAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import SetsList from "./SetsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SetsSection = () => {
  const loadableSets = useAtomValue(loadableSetsAtom);
  const setSets = useSetAtom(setsAtom);
  const addSet = useSetAtom(addSetAtom);

  useEffect(() => {
    if (loadableSets.state === "hasData") {
      setSets(loadableSets.data);
    }
  }, [loadableSets, setSets]);

  const handleAddSet = async () => {
    const date = new Date().toLocaleString();
    const body = {
      name: "New Set",
      create_date: date,
      update_date: date,
    };
    await addSet(body);
  };

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
