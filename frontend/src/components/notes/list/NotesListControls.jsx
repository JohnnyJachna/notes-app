import React, { useEffect } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai/react";
import {
  ascendingAtom,
  isFilteredAtom,
  tagSelectionAtom,
  sourceSelectionAtom,
  tagsNamesAtom,
  sourcesNamesAtom,
  tagsAvailableAtom,
  sourcesAvailableAtom,
} from "./NotesListAtoms";

import NotesSortControls from "./NotesSortControls";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesListFilterControls from "./NotesListFilterControls";

const NotesListControls = () => {
  const setIsFiltered = useSetAtom(isFilteredAtom);
  const setAscending = useSetAtom(ascendingAtom);

  const tagsNames = useAtomValue(tagsNamesAtom);
  const tagsAvailable = useAtomValue(tagsAvailableAtom);
  const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);

  const sourcesNames = useAtomValue(sourcesNamesAtom);
  const sourcesAvailable = useAtomValue(sourcesAvailableAtom);
  const [sourceSelection, setSourceSelection] = useAtom(sourceSelectionAtom);

  useEffect(() => {
    if (!tagSelection && tagsNames.length > 0) setTagSelection(tagsNames[0]);
    if (!sourceSelection && sourcesNames.length > 0)
      setSourceSelection(sourcesNames[0]);
  }, [tagsNames, sourcesNames]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex gap-1">
        <NotesSortControls
          onOrderToggle={() => setAscending((prev) => !prev)}
        />
        <NotesSortDropdown />
      </div>
      {(tagsAvailable || sourcesAvailable) && (
        <NotesListFilterControls
          handleFilterToggle={() => setIsFiltered((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default React.memo(NotesListControls);
