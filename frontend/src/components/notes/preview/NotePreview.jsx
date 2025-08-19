import { useAtomValue } from "jotai/react";

import NoteTagsPreview from "./NoteTagsPreview";
import NoteSourcesPreview from "./NoteSourcesPreview";

import { HR } from "flowbite-react";

const NotePreview = ({ noteAtom }) => {
  const note = useAtomValue(noteAtom);

  return (
    <div className="flex flex-col h-full">
      {note.header ? (
        <>
          <p className="font-semibold truncate">{note.header}</p>
          <HR className="!m-1" />
        </>
      ) : (
        <p className="font-semibold truncate">&nbsp;</p>
      )}
      <div className="relative max-h-32 overflow-auto text-sm leading-snug">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
      </div>
      <HR className="!m-1" />
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
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
