import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import Button from "../../Button";
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
      <Button
        type="button"
        name={isFiltered ? "Unfilter" : "Filter"}
        onClick={handleFilterToggle}
      />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        {tagsAvailable && (
          <option key="Tag" value="Tag">
            Tag
          </option>
        )}
        {sourcesAvailable && (
          <option key="Source" value="Source">
            Source
          </option>
        )}
      </select>
      {filterType === "Tag" && (
        <select
          value={tagSelection}
          onChange={(e) => setTagSelection(e.target.value)}
        >
          {tagsNames.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      )}
      {filterType === "Source" && (
        <select
          value={sourceSelection}
          onChange={(e) => setSourceSelection(e.target.value)}
        >
          {sourcesNames.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default NotesListFilterControls;
