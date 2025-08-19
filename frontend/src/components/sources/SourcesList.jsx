import React, { useState } from "react";

import { useAtomValue } from "jotai/react";
import { sourcesAtom, splitSourcesAtom } from "./SourcesAtoms";

import Source from "./Source";

import { Button, ButtonGroup } from "flowbite-react";

const SourcesList = ({ handleAddSource }) => {
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
      <div className="flex items-baseline justify-between mb-3">
        <Button onClick={handleAddSource} size="xs" color="green">
          Add Source
        </Button>
        {sourcesList.length > 0 && (
          <ButtonGroup className="mt-2">
            <Button onClick={handleSortToggle} size="xs" color="alternative">
              {isSorted ? "Unsort" : "Sort"}
            </Button>
            <Button
              onClick={handleOrderToggle}
              disabled={!isSorted}
              size="xs"
              color="alternative"
            >
              {ascending ? "Asc" : "Desc"}
            </Button>
          </ButtonGroup>
        )}
      </div>
      {sortedSourceAtoms.map((sourceAtom, idx) => (
        <Source
          key={sortedSources[idx].id}
          sourceAtom={sourceAtom}
          className="flex flex-col gap-2"
        />
      ))}
    </>
  );
};

export default React.memo(SourcesList);
