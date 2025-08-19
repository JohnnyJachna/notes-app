import { useEffect } from "react";
import { useParams } from "react-router";

import { addSetAtom, fetchSetsAtom } from "./SetsAtoms";
import { useSetAtom } from "jotai/react";

import SetsList from "./SetsList";
import SetAdd from "./SetAdd";
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
    <div className=" m-3 w-full max-w-sm">
      <div>
        <SetsList className="flex flex-wrap" />
      </div>
      <SetAdd handleAddSet={handleAddSet} />
    </div>
  );
};

export default SetsSection;
