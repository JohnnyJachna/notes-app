import React, { useState } from "react";

import { useAtomValue } from "jotai/react";
import { tagsAtom, splitTagsAtom } from "./TagsAtoms";

import Tag from "./Tag";

import { Button, ButtonGroup } from "flowbite-react";

const TagsList = ({ handleAddTag }) => {
  const tagsList = useAtomValue(tagsAtom);
  const tagAtoms = useAtomValue(splitTagsAtom);
  const [isSorted, setIsSorted] = useState(false);
  const [ascending, setAscending] = useState(true);

  const sortedTags = isSorted
    ? [...tagsList].sort((a, b) => {
        const nameA = a.name?.toLowerCase() ?? ""; // if it has a name, lowercase it, else empty string
        const nameB = b.name?.toLowerCase() ?? "";
        if (nameA < nameB) return ascending ? -1 : 1; // if sort by ascending, -1 else 1
        if (nameA > nameB) return ascending ? 1 : -1;
        return 0; // if names equal, keep positions
      })
    : tagsList;

  const sortedTagAtoms = sortedTags.map((tag) =>
    tagAtoms.find((_, index) => tagsList[index].id === tag.id)
  );

  // go through the tagAtom's indexes
  // is the id at this index equal to the current sorted id
  // if so, return that atom into sortedTagAtoms
  // works because
  // Ex:
  // tagsList = [{id: 1}, {id: 2}, {id: 3}]
  // tagAtoms = [atom1, atom2, atom3]
  // sortedTags = [{id: 2}, {id: 1}, {id: 3}]
  // sortedTagAtoms = [atom2, atom1, atom3]

  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
  };

  const handleOrderToggle = () => {
    setAscending((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-baseline justify-between mb-3">
        <Button onClick={handleAddTag} size="xs" color="green">
          Add Tag
        </Button>
        {tagsList.length > 0 && (
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
      {sortedTagAtoms.map((tagAtom, idx) => (
        <Tag
          key={sortedTags[idx].id}
          tagAtom={tagAtom}
          className="flex flex-col gap-2"
        />
      ))}
    </>
  );
};

export default React.memo(TagsList);
