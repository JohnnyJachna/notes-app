import { noteSizeAtom } from "../NotesAtoms";
import { useAtomValue } from "jotai/react";
import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

import NoteTagsPreview from "./NoteTagsPreview";
import NoteSourcesPreview from "./NoteSourcesPreview";

import { HR } from "flowbite-react";

const sizes = {
  small: "max-h-24",
  medium: "max-h-32",
  large: "max-h-48",
  full: "max-h-none",
};

const NotePreview = ({ note }) => {
  const noteSize = useAtomValue(noteSizeAtom);
  const bgColor = validHex(note.color) ? note.color : "#FFFFFF";
  const hrColor = getContrastingColor(bgColor);

  return (
    <div className="flex flex-col h-full">
      <p className="font-semibold truncate">{note.header}</p>
      {note.content && (
        <>
          <HR className="m-1" style={{ background: hrColor }} />
          <div
            className={`${sizes[noteSize]} overflow-auto text-sm leading-snug`}
          >
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          </div>
          <HR className="m-1" style={{ background: hrColor }} />
        </>
      )}
      <div className="flex flex-col gap-2 flex-1 overflow-auto justify-end mt-1">
        <NoteTagsPreview tags={note.tags} />
        <NoteSourcesPreview sources={note.sources} />
      </div>
      <HR className="m-1" style={{ background: hrColor }} />
      <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
        Last Edit: {note.update_date}
      </p>
    </div>
  );
};

export default NotePreview;
