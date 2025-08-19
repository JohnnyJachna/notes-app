import { useEffect } from "react";
import { useParams } from "react-router";

import { addTagAtom, fetchTagsAtom } from "./TagsAtoms";
import { useSetAtom } from "jotai/react";

import TagsList from "./TagsList";
import { Button } from "flowbite-react";

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
    <>
      <div className="flex flex-row gap-2 items-center">
        <Button onClick={handleAddTag} size="xs" color="green">
          Add Tag
        </Button>
      </div>
      <TagsList />
    </>
  );
};

export default TagsSection;
