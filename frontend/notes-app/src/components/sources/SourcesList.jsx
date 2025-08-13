import React from "react";
import Source from "./Source";
import { splitSourcesAtom } from "./SourcesAtoms";
import { useAtom } from "jotai/react";

const SourcesList = () => {
  const [sourcesList] = useAtom(splitSourcesAtom);

  return (
    <>
      <h4>Sources List</h4>
      {sourcesList.map((singleSource) => (
        <Source key={singleSource.toString()} sourceAtom={singleSource} />
      ))}
    </>
  );
};

export default React.memo(SourcesList);
