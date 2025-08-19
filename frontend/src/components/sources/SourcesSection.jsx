import { useEffect } from "react";
import { useParams } from "react-router";

import { addSourceAtom, fetchSourcesAtom } from "./SourcesAtoms";
import { useSetAtom } from "jotai/react";

import SourcesList from "./SourcesList";
import { Button } from "flowbite-react";

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
      <div className="flex flex-row gap-2 items-center">
        <Button onClick={handleAddSource} size="xs" color="green">
          Add Source
        </Button>
      </div>
      <SourcesList />
    </>
  );
};

export default SourcesSection;
