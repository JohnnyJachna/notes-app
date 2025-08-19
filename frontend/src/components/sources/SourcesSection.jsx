import { useEffect } from "react";
import { useParams } from "react-router";

import { addSourceAtom, fetchSourcesAtom } from "./SourcesAtoms";
import { useSetAtom } from "jotai/react";

import SourcesList from "./SourcesList";

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
    <>
      <SourcesList handleAddSource={handleAddSource} />
    </>
  );
};

export default SourcesSection;
