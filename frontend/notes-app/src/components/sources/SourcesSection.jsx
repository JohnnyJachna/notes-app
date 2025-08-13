import { useEffect } from "react";
import { useParams } from "react-router";

import {
  loadableSourcesAtom,
  addSourceAtom,
  sourcesAtom,
  sourcesSetIDAtom,
} from "./SourcesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import SourcesList from "./SourcesList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const SourcesSection = () => {
  const { setID } = useParams();

  const loadableSources = useAtomValue(loadableSourcesAtom);
  const setSources = useSetAtom(sourcesAtom);
  const addSource = useSetAtom(addSourceAtom);
  const setSourcesSetID = useSetAtom(sourcesSetIDAtom);

  useEffect(() => {
    setSourcesSetID(setID);
  }, [setID, setSourcesSetID]);

  useEffect(() => {
    if (loadableSources.state === "hasData") {
      setSources(loadableSources.data);
    }
  }, [loadableSources, setSources]);

  const handleAddSource = async () => {
    const body = {
      name: "New Source",
      set_id: setID,
    };
    await addSource(body);
  };

  return (
    <div className={styles.section}>
      <SourcesList />
      <Button type="button" name="Add Source" onClick={handleAddSource} />
    </div>
  );
};

export default SourcesSection;
