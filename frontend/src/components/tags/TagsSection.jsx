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
    <div className="m-3 p-5 border-1 border-solid border-b-gray-400 rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <h4>Tags</h4>
        <Button onClick={handleAddTag} size="xs" color="green">
          +
        </Button>
      </div>
      <TagsList />
    </div>
  );
};

export default TagsSection;
