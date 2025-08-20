import { useState, useEffect, useMemo } from "react";

import { tagsAtom } from "../../tags/TagsAtoms";
import { useAtomValue } from "jotai/react";

import NoteTag from "./NoteTag";
import ButtonAdd from "@/components/buttons/ButtonAdd";

import { Dropdown, DropdownItem } from "flowbite-react";

const NoteTagsEditor = ({ tags, setTags }) => {
  const allTags = useAtomValue(tagsAtom);

  const addableTags = useMemo(
    () =>
      allTags.filter((tag) => !tags.some((noteTag) => noteTag.id === tag.id)),
    [allTags, tags]
  );
  const [tagSelection, setTagSelection] = useState(
    addableTags.length > 0 ? addableTags[0].id : ""
  );

  useEffect(() => {
    if (addableTags.length > 0) setTagSelection(addableTags[0]);
    else setTagSelection("");
  }, [addableTags]);

  const handleAddTag = () => {
    const tagToAdd = allTags.find((tag) => tag.id === Number(tagSelection.id));
    if (tagToAdd) setTags([...tags, tagToAdd]);
  };
  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="mt-2 mb-2 flex flex-row flex-wrap items-center">
      <h4 className="font-semibold text-lg">Tags</h4>
      {addableTags?.length > 0 && (
        <>
          <ButtonAdd onClick={handleAddTag} />
          <Dropdown label={tagSelection.name} size="sm" className="mr-2.5">
            {addableTags.map((tag) => (
              <DropdownItem key={tag.id} onClick={() => setTagSelection(tag)}>
                {tag.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </>
      )}
      <ul className="flex gap-1 flex-wrap">
        {tags.map((tag) => (
          <NoteTag
            key={tag.id + tag.name}
            tag={tag}
            handleRemove={handleRemoveTag}
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteTagsEditor;
