import { noteSizeAtom } from "../NotesAtoms";
import { useAtomValue } from "jotai/react";

import NoteTagsPreview from "./NoteTagsPreview";
import NoteSourcesPreview from "./NoteSourcesPreview";

import { HR } from "flowbite-react";

const sizes = {
  small: "max-h-24", // ~224px
  medium: "max-h-32", // ~320px
  large: "max-h-48", // custom
  full: "max-h-none", // no limit
};

const NotePreview = ({ noteAtom }) => {
  const note = useAtomValue(noteAtom);
  const noteSize = useAtomValue(noteSizeAtom);

  return (
    <div className="flex flex-col h-full">
      {note.header ? (
        <>
          <p className="font-semibold truncate">{note.header}</p>
          <HR className="!m-1" />
        </>
      ) : (
        <p className="font-semibold truncate">Note Header</p>
      )}
      <div className={`${sizes[noteSize]} overflow-auto text-sm leading-snug`}>
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
      <HR className="!m-1" />
      <div className="flex flex-col gap-2 flex-1 overflow-hidden mt-1">
        <NoteTagsPreview tags={note.tags} />
        <NoteSourcesPreview sources={note.sources} />
      </div>

      <HR className="!m-1" />
      <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
        Last Edit: {note.update_date}
      </p>
    </div>
  );
};

export default NotePreview;
