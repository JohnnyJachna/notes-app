import React from "react";
import Set from "./Set";
import { splitSetsAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";
import { ListGroup, ListGroupItem } from "flowbite-react";

const SetsList = () => {
  const [setsList] = useAtom(splitSetsAtom);

  return (
    <>
      <h4>Sets List</h4>
      <ListGroup>
        {setsList.map((singleSet) => (
          <ListGroupItem
            key={singleSet.toString()}
            className="flex items-center"
          >
            <Set key={singleSet.toString()} setAtom={singleSet} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default React.memo(SetsList);
