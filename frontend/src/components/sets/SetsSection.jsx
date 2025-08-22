import { useEffect } from "react";
import { useParams } from "react-router";

import { addSetAtom, fetchSetsAtom, splitSetsAtom } from "./SetsAtoms";
import { useAtom, useSetAtom } from "jotai/react";

import Set from "./Set";
import SetAdd from "./SetAdd";
import { Button } from "flowbite-react";

const SetsSection = () => {
  const { setID } = useParams();

  const addSet = useSetAtom(addSetAtom);
  const fetchSets = useSetAtom(fetchSetsAtom);
  const [setsList] = useAtom(splitSetsAtom);

  useEffect(() => {
    fetchSets(setID);
  }, [setID, fetchSets]);

  const handleAddSet = async () => {
    await addSet(setID);
  };

  return (
    <div className="max-w-8/12 mx-auto">
      <div className="m-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {setsList.map((setAtom) => (
          <Set setAtom={setAtom} key={setAtom.toString()} />
        ))}
        <SetAdd handleAddSet={handleAddSet} />
      </div>
    </div>
  );
};

export default SetsSection;
