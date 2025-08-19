import { Badge } from "flowbite-react";

const NoteTagsPreview = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 align-baseline items-center">
      <p>Tags:</p>
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            return (
              <Badge key={tag.id}>
                <p>{tag.name}</p>
              </Badge>
            );
          })}
        </ul>
      ) : (
        <p>Click edit to add a tag</p>
      )}
    </div>
  );
};

export default NoteTagsPreview;
