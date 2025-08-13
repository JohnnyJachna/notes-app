import React from "react";
import Set from "./Set";
import { splitSetsAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";

const SetsList = () => {
  const [setsList] = useAtom(splitSetsAtom);

  return (
    <>
      <h4>Sets List</h4>
      {setsList.map((singleSet) => (
        <Set key={singleSet.toString()} setAtom={singleSet} />
      ))}
    </>
  );
};

export default React.memo(SetsList);
