import { useState, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateNoteAtom } from "../NotesAtoms";
import NoteHeaderEditor from "./NoteHeaderEditor";
import NoteContentEditor from "./NoteContentEditor";
import NoteTagsEditor from "./NoteTagsEditor";
import NoteSourcesEditor from "./NoteSourcesEditor";

import {
  Button,
  HR,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const NoteEditor = ({ noteAtom, open, handleCloseEditor }) => {
  const note = useAtomValue(noteAtom);
  const updateNote = useSetAtom(updateNoteAtom);

  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);
  const [noteTags, setNoteTags] = useState(note.tags);
  const [noteSources, setNoteSources] = useState(note.sources);
  const [color, setColor] = useState(note.color);

  const editorFocusRef = useRef(null);

  const handleCancel = () => {
    setHeader(note.header);
    setContent(note.content);
    setNoteTags(note.tags);
    setNoteSources(note.sources);
    setColor(note.color);
    handleCloseEditor();
  };

  const handleSave = async () => {
    await updateNote({
      note,
      header,
      content,
      noteTags,
      noteSources,
      color,
    });
    handleCloseEditor();
  };

  return (
    <Modal
      dismissible
      show={open}
      onClose={handleCancel}
      size="7xl"
      className="text-gray-100"
    >
      <ModalHeader>
        <NoteHeaderEditor header={header} setHeader={setHeader} />
      </ModalHeader>
      <ModalBody className="flex flex-col gap-2 !p-3">
        <NoteContentEditor
          content={content}
          setContent={setContent}
          focusRef={editorFocusRef}
          autoFocus={true}
        />
        <NoteTagsEditor tags={noteTags} setTags={setNoteTags} />
        <HR className="!m-1 !bg-gray-400" />
        <NoteSourcesEditor sources={noteSources} setSources={setNoteSources} />
        <Button onClick={handleSave} color="green">
          Save
        </Button>
      </ModalBody>
      <ModalFooter className="flex justify-center ">
        <div className="text-sm text-gray-400 flex justify-center gap-2 flex-wrap">
          <p>Last Edit : {note.update_date}</p>
          <p>Created on : {note.create_date}</p>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default NoteEditor;
