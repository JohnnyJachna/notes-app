import { useEffect } from "react";
import { useParams } from "react-router";

import { addSetAtom, fetchSetsAtom } from "./SetsAtoms";
import { useSetAtom } from "jotai/react";

import SetsList from "./SetsList";
import { Button } from "flowbite-react";

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
    <div>
      <SetsList />
      <Button color="green" onClick={handleAddSet}>
        Add Set
      </Button>
    </div>
  );
};

export default SetsSection;
