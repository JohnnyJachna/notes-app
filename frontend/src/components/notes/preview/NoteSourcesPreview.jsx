import { Badge } from "flowbite-react";
import { LuNotepadText } from "react-icons/lu";

import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

const NoteSourcesPreview = ({ sources }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs">
      <LuNotepadText className="size-5" />
      {sources && sources.length > 0 ? (
        <ul className="flex flex-wrap gap-1">
          {sources.map((source) => {
            const bgColor = validHex(source.color) ? source.color : "#F8E61B";
            const txtColor = getContrastingColor(bgColor);
            return (
              <Badge
                key={source.id}
                className={`border rounded-md border-[${txtColor}]`}
                style={{ backgroundColor: bgColor, color: txtColor }}
              >
                <p className="truncate max-w-20">{source.name}</p>
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

export default NoteSourcesPreview;
