import React, { useEffect } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai/react";
import {
  isSortedAtom,
  ascendingAtom,
  isFilteredAtom,
  tagSelectionAtom,
  sourceSelectionAtom,
  tagsNamesAtom,
  sourcesNamesAtom,
  tagsAvailableAtom,
  sourcesAvailableAtom,
  refinedNotesAtom,
} from "./NotesListAtoms";

import NotesSortControls from "./NotesSortControls";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesListItems from "./NotesListItems";
import NotesListFilterControls from "./NotesListFilterControls";
import NoteSizeDropdown from "./NoteSizeDropdown";

const NotesList = () => {
  const refinedNotes = useAtomValue(refinedNotesAtom);

  const setIsSorted = useSetAtom(isSortedAtom);
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
    <>
      {refinedNotes.length > 0 && (
        <div className="mt-4 mb-4 flex flex-row flex-wrap gap-1">
          <NotesSortControls
            onSortToggle={() => setIsSorted((prev) => !prev)}
            onOrderToggle={() => setAscending((prev) => !prev)}
          />
          <NotesSortDropdown />
          {(tagsAvailable || sourcesAvailable) && (
            <NotesListFilterControls
              handleFilterToggle={() => setIsFiltered((prev) => !prev)}
            />
          )}
          <NoteSizeDropdown />
        </div>
      )}
      <NotesListItems />
    </>
  );
};

export default React.memo(NotesList);
