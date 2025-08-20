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
  refinedNotesAtom,
} from "./NotesListAtoms";

import NotesSortControls from "./NotesSortControls";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesListItems from "./NotesListItems";
import NotesListFilterControls from "./NotesListFilterControls";
import NoteSizeDropdown from "./NoteSizeDropdown";

import { HR } from "flowbite-react";

const NotesList = () => {
  const refinedNotes = useAtomValue(refinedNotesAtom);

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
        <div className="mt-4 mb-4 flex flex-wrap gap-5 items-center-safe">
          <NoteSizeDropdown />
          <div className="flex gap-1">
            <NotesSortDropdown />
            <NotesSortControls
              onOrderToggle={() => setAscending((prev) => !prev)}
            />
          </div>
          {(tagsAvailable || sourcesAvailable) && (
            <NotesListFilterControls
              handleFilterToggle={() => setIsFiltered((prev) => !prev)}
            />
          )}
        </div>
      )}
      <HR />
      <NotesListItems />
    </>
  );
};

export default React.memo(NotesList);
