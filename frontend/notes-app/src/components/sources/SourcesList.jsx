import React, { useState } from "react";
import Source from "./Source";
import { sourcesAtom, splitSourcesAtom } from "./SourcesAtoms";
import { useAtomValue } from "jotai/react";
import Button from "../Button";

const SourcesList = () => {
  const sourcesList = useAtomValue(sourcesAtom);
  const sourceAtoms = useAtomValue(splitSourcesAtom);
  const [isSorted, setIsSorted] = useState(false);
  const [ascending, setAscending] = useState(true);

  const sortedSources = isSorted
    ? [...sourcesList].sort((a, b) => {
        const nameA = a.name?.toLowerCase() ?? "";
        const nameB = b.name?.toLowerCase() ?? "";
        if (nameA < nameB) return ascending ? -1 : 1;
        if (nameA > nameB) return ascending ? 1 : -1;
        return 0;
      })
    : sourcesList;

  const sortedSourceAtoms = sortedSources.map((source) =>
    sourceAtoms.find((_, index) => sourcesList[index].id === source.id)
  );

  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
  };

  const handleOrderToggle = () => {
    setAscending((prev) => !prev);
  };

  return (
    <>
      <h4>Sources List</h4>
      {sourcesList.length > 0 && (
        <div>
          <Button
            type="button"
            name={isSorted ? "Unsort" : "Sort"}
            onClick={handleSortToggle}
          />
          <Button
            type="button"
            name={ascending ? "Asc" : "Desc"}
            onClick={handleOrderToggle}
            disabled={!isSorted}
          />
        </div>
      )}
      {sortedSourceAtoms.map((sourceAtom, idx) => (
        <Source key={sortedSources[idx].id} sourceAtom={sourceAtom} />
      ))}
    </>
  );
};

export default React.memo(SourcesList);
