import { useEffect } from "react";
import { useParams } from "react-router";

import { addSourceAtom, fetchSourcesAtom } from "./SourcesAtoms";
import { useSetAtom } from "jotai/react";

import SourcesList from "./SourcesList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SourcesSection = () => {
  const { setID } = useParams();

  const addSource = useSetAtom(addSourceAtom);
  const fetchSources = useSetAtom(fetchSourcesAtom);

  useEffect(() => {
    fetchSources(setID);
  }, [setID, fetchSources]);

  const handleAddSource = async () => {
    await addSource(setID);
  };

  return (
    <div className={styles.section}>
      <SourcesList />
      <Button type="button" name="Add Source" onClick={handleAddSource} />
    </div>
  );
};

export default SourcesSection;
