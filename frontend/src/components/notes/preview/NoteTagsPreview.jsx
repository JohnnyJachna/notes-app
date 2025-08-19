import { Badge } from "flowbite-react";

const NoteTagsPreview = ({ tags }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs">
      <span className="font-medium">Tags:</span>
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag) => {
            return (
              <Badge
                key={tag.id}
                color={tag.color}
                className="whitespace-nowrap"
              >
                <p>{tag.name}</p>
              </Badge>
            );
          })}
        </ul>
      ) : (
        <span className="text-gray-500">None</span>
      )}
    </div>
  );
};

export default NoteTagsPreview;
