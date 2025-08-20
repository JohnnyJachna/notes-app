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

  const trunc = (text) => (
    <span className="truncate" title={text}>
      {text}
    </span>
  );

  return (
    <div className="flex gap-1 flex-wrap">
      {/* Filter Toggle */}

      <Button color="alternative" onClick={handleFilterToggle} className="w-21">
        {isFiltered ? "Unfilter" : "Filter"}
      </Button>

      {/* Filter Type */}

      <Dropdown label={filterType} color="alternative" className="w-30">
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

      {/* Filter Selection */}

      {filterType === "Tag" && (
        <Dropdown
          label={trunc(tagSelection)}
          color="alternative"
          className="w-30"
        >
          {tagsNames.map((tag, index) => (
            <DropdownItem
              key={index}
              onClick={() => setTagSelection(tag)}
              className="!p-0"
            >
              <span className="block px-3 py-2 truncate max-w-full" title={tag}>
                {tag}
              </span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      {filterType === "Source" && (
        <Dropdown
          label={trunc(sourceSelection)}
          color="alternative"
          className="w-30"
        >
          {sourcesNames.map((source, index) => (
            <DropdownItem
              key={index}
              onClick={() => setSourceSelection(source)}
              className="!p-0"
            >
              <span
                className="block px-3 py-2 truncate max-w-full"
                title={source}
              >
                {source}
              </span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  );
};

export default NotesListFilterControls;
