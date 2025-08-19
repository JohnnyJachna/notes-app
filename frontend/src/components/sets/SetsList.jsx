import React from "react";
import Set from "./Set";
import { splitSetsAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";
import { ListGroup, ListGroupItem } from "flowbite-react";

const SetsList = () => {
  const [setsList] = useAtom(splitSetsAtom);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {setsList.map((setAtom) => (
        <Set setAtom={setAtom} key={setAtom.toString()} className="p-2" />
      ))}
    </div>
  );
};

export default React.memo(SetsList);
