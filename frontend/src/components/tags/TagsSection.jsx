import { useEffect } from "react";
import { useParams } from "react-router";

import { addTagAtom, fetchTagsAtom } from "./TagsAtoms";
import { useSetAtom } from "jotai/react";

import TagsList from "./TagsList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const TagsSection = () => {
  const { setID } = useParams();

  const addTag = useSetAtom(addTagAtom);
  const fetchTags = useSetAtom(fetchTagsAtom);

  useEffect(() => {
    fetchTags(setID);
  }, [setID, fetchTags]);

  const handleAddTag = async () => {
    await addTag(setID);
  };

  return (
    <div className={styles.section}>
      <TagsList />
      <Button type="button" name="Add Tag" onClick={handleAddTag} />
    </div>
  );
};

export default TagsSection;
