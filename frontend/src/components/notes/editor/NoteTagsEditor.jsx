import { useState, useEffect, useMemo } from "react";
import { tagsAtom } from "../../tags/TagsAtoms";
import { useAtomValue } from "jotai/react";
import NoteTag from "./NoteTag";

import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  Toast,
  ToastToggle,
} from "flowbite-react";

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
    <div>
      <h4>Tags</h4>
      <ul className="flex flex-row flex-wrap gap-2">
        {tags.map((tag) => (
          <>
            <NoteTag
              key={tag.id + tag.name}
              tag={tag}
              handleRemoveTag={handleRemoveTag}
            />
          </>
        ))}
      </ul>
      {addableTags.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button onClick={handleAddTag}>Add Tag</Button>
          <Dropdown label={tagSelection.name}>
            {addableTags.map((tag) => (
              <DropdownItem key={tag.id} onClick={() => setTagSelection(tag)}>
                {tag.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default NoteTagsEditor;
