import { useEffect } from "react";
import { useParams } from "react-router";

import { addSetAtom, fetchSetsAtom } from "./SetsAtoms";
import { useSetAtom } from "jotai/react";

import SetsList from "./SetsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SetsSection = () => {
  const { setID } = useParams();

  const addSet = useSetAtom(addSetAtom);
  const fetchSets = useSetAtom(fetchSetsAtom);

  useEffect(() => {
    fetchSets(setID);
  }, [setID, fetchSets]);

  const handleAddSet = async () => {
    await addSet(setID);
  };

  return (
    <div className={styles.section}>
      <SetsList />
      <Button type="button" name="Add Set" onClick={handleAddSet} />
    </div>
  );
};

export default SetsSection;
