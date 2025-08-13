import { useEffect } from "react";
import { useParams } from "react-router";

import {
  loadableTagsAtom,
  addTagAtom,
  tagsAtom,
  tagsSetIDAtom,
} from "./TagsAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import TagsList from "./TagsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const TagsSection = () => {
  const { setID } = useParams();

  const loadableTags = useAtomValue(loadableTagsAtom);
  const setTags = useSetAtom(tagsAtom);
  const addTag = useSetAtom(addTagAtom);
  const setTagsSetID = useSetAtom(tagsSetIDAtom);

  useEffect(() => {
    setTagsSetID(setID);
  }, [setID, setTagsSetID]);

  useEffect(() => {
    if (loadableTags.state === "hasData") {
      setTags(loadableTags.data);
    }
  }, [loadableTags, setTags]);

  const handleAddTag = async () => {
    const body = {
      name: "New Tag",
      set_id: setID,
    };
    await addTag(body);
  };

  return (
    <div className={styles.section}>
      <TagsList />
      <Button type="button" name="Add Tag" onClick={handleAddTag} />
    </div>
  );
};

export default TagsSection;
