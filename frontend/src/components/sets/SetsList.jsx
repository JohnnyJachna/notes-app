import React from "react";
import Set from "./Set";
import { splitSetsAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";
import { ListGroup, ListGroupItem } from "flowbite-react";

const SetsList = () => {
  const [setsList] = useAtom(splitSetsAtom);

  return (
    <div className="w-full max-w-md">
      <h4 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
        Sets
      </h4>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded border border-gray-200 dark:border-gray-600">
        {setsList.map((setAtom) => (
          <li key={setAtom.toString()} className="p-2">
            <Set setAtom={setAtom} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(SetsList);
