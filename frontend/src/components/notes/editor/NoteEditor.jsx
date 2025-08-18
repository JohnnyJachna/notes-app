import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateNoteAtom } from "../NotesAtoms";
import NoteHeaderEditor from "./NoteHeaderEditor";
import NoteContentEditor from "./NoteContentEditor";
import NoteTagsEditor from "./NoteTagsEditor";
import NoteSourcesEditor from "./NoteSourcesEditor";
import TTEditor from "./TTEditor";
import TextEditor from "./TextEditor";

import {
  Button,
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

  const handleCancel = () => {
    setHeader(note.header);
    setContent(note.content);
    setNoteTags(note.tags);
    setNoteSources(note.sources);
    console.log("cancel");
    handleCloseEditor();
  };

  const handleSave = async () => {
    await updateNote({
      note,
      header,
      content,
      noteTags,
      noteSources,
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
      <ModalBody className="flex flex-col ">
        {/* <NoteContentEditor content={content} setContent={setContent} /> */}
        <TTEditor content={content} setContent={setContent} />
        {/* <TextEditor/> */}
        <NoteTagsEditor tags={noteTags} setTags={setNoteTags} />
        <NoteSourcesEditor sources={noteSources} setSources={setNoteSources} />
        <Button onClick={handleSave} color="green">
          Save
        </Button>
      </ModalBody>
      <ModalFooter>
        <p>Last Edit : {note.update_date}</p>
        <p>Created on : {note.create_date}</p>
      </ModalFooter>
    </Modal>
  );
};

export default NoteEditor;
