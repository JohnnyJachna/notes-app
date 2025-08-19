import { useState, useEffect, useMemo } from "react";
import { tagsAtom } from "../../tags/TagsAtoms";
import { useAtomValue } from "jotai/react";
import NoteChip from "./NoteChip";

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
    <div className="mt-2 mb-2 flex flex-row flex-wrap gap-2">
      <h4>Tags</h4>
      <Button onClick={handleAddTag} size="xs">
        +
      </Button>
      <Dropdown label={tagSelection.name}>
        {addableTags.map((tag) => (
          <DropdownItem key={tag.id} onClick={() => setTagSelection(tag)}>
            {tag.name}
          </DropdownItem>
        ))}
      </Dropdown>
      <ul className="flex flex-row">
        {tags.map((tag) => (
          <NoteChip
            key={tag.id + tag.name}
            item={tag}
            handleRemove={handleRemoveTag}
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteTagsEditor;
