import { useAtomValue } from "jotai/react";

import NoteTagsPreview from "./NoteTagsPreview";
import NoteSourcesPreview from "./NoteSourcesPreview";
import { HR } from "flowbite-react";

const NotePreview = ({ noteAtom }) => {
  const note = useAtomValue(noteAtom);

  return (
    <div className="flex flex-col h-full">
      {note.header ? (
        <p className="font-semibold truncate">{note.header}</p>
      ) : (
        <p className="font-semibold truncate">Note Header</p>
      )}
      <HR className="!m-1" />
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <NoteTagsPreview tags={note.tags} />
        <NoteSourcesPreview sources={note.sources} />
      </div>
      <HR className="!m-1" />
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Last Edit: {note.update_date}
      </p>
    </div>
  );
};

export default NotePreview;
