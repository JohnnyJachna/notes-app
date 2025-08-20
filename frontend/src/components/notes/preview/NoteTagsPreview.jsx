import { Badge } from "flowbite-react";
import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

const NoteTagsPreview = ({ tags }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs">
      <span className="font-medium">Tags:</span>
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag) => {
            const bgColor = validHex(tag.color) ? tag.color : "#F8E61B";
            const txtColor = getContrastingColor(bgColor);
            return (
              <Badge
                key={tag.id}
                className={`border rounded-md border-[${txtColor}]`}
                style={{ backgroundColor: bgColor, color: txtColor }}
              >
                <p className="truncate max-w-20">{tag.name}</p>
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
