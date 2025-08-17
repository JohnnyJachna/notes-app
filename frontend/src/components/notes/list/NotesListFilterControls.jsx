import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  isFilteredAtom,
  filterTypeAtom,
  tagsNamesAtom,
  tagsAvailableAtom,
  tagSelectionAtom,
  sourcesNamesAtom,
  sourcesAvailableAtom,
  sourceSelectionAtom,
} from "./NotesListAtoms";

import { Button, Dropdown, DropdownItem } from "flowbite-react";

const NotesListFilterControls = ({ handleFilterToggle }) => {
  const isFiltered = useAtomValue(isFilteredAtom);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);

  const tagsNames = useAtomValue(tagsNamesAtom);
  const tagsAvailable = useAtomValue(tagsAvailableAtom);
  const [tagSelection, setTagSelection] = useAtom(tagSelectionAtom);

  const sourcesNames = useAtomValue(sourcesNamesAtom);
  const sourcesAvailable = useAtomValue(sourcesAvailableAtom);
  const [sourceSelection, setSourceSelection] = useAtom(sourceSelectionAtom);

  useEffect(() => {
    if (tagsAvailable && !sourcesAvailable) {
      setFilterType("Tag");
      setTagSelection(tagsNames[0]);
    } else if (sourcesAvailable && !tagsAvailable) {
      setFilterType("Source");
      setSourceSelection(sourcesNames[0]);
    }
  }, [tagsNames, tagsAvailable, sourcesNames, sourcesAvailable]);

  return (
    <>
      <Button color="alternative" onClick={handleFilterToggle}>
        {isFiltered ? "Unfilter" : "Filter"}
      </Button>
      <Dropdown label={filterType} color="alternative">
        {tagsAvailable && (
          <DropdownItem key="Tag" onClick={() => setFilterType("Tag")}>
            Tag
          </DropdownItem>
        )}
        {sourcesAvailable && (
          <DropdownItem key="Source" onClick={() => setFilterType("Source")}>
            Source
          </DropdownItem>
        )}
      </Dropdown>
      {filterType === "Tag" && (
        <Dropdown label={tagSelection} color="alternative">
          {tagsNames.map((tag, index) => (
            <DropdownItem key={index} onClick={() => setTagSelection(tag)}>
              {tag}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      {filterType === "Source" && (
        <Dropdown label={sourceSelection} color="alternative">
          {sourcesNames.map((source, index) => (
            <DropdownItem
              key={index}
              onClick={() => setSourceSelection(source)}
            >
              {source}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </>
  );
};

export default NotesListFilterControls;
