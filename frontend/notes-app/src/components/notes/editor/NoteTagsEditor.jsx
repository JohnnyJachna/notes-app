import { useState, useEffect, useMemo } from "react";
import { tagsAtom } from "../../tags/TagsAtoms";
import { useAtomValue } from "jotai/react";

import Button from "../../Button";

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
    if (addableTags.length > 0) setTagSelection(addableTags[0].id);
    else setTagSelection("");
  }, [addableTags]);

  const handleAddTag = () => {
    const tagToAdd = allTags.find((tag) => tag.id === Number(tagSelection));
    if (tagToAdd) setTags([...tags, tagToAdd]);
  };
  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div>
      <h4>Tags</h4>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.name}
            <Button
              type="button"
              name="Delete"
              onClick={() => handleRemoveTag(tag.id)}
            />
          </li>
        ))}
      </ul>
      {addableTags.length > 0 && (
        <>
          <select
            value={tagSelection}
            onChange={(e) => setTagSelection(e.target.value)}
          >
            {addableTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <Button type="button" name="Add Tag" onClick={handleAddTag} />
        </>
      )}
    </div>
  );
};

export default NoteTagsEditor;
