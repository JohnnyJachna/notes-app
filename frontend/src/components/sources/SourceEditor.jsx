import { useState } from "react";

import { useAtomValue, useSetAtom } from "jotai/react";
import { updateSourceAtom } from "./SourcesAtoms";

import ButtonColorToggle from "../buttons/ButtonColorToggle";
import SourceColorEditor from "./SourceColorEditor";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import Source from "./Source";

const SourceEditor = ({ sourceAtom, open, handleCloseEditor }) => {
  const source = useAtomValue(sourceAtom);
  const updateSource = useSetAtom(updateSourceAtom);

  const [name, setName] = useState(source.name);
  const [color, setColor] = useState(source.color);
  const [title, setTitle] = useState(source.title);
  const [authors, setAuthors] = useState(source.authors);
  const [publishers, setPublishers] = useState(source.publishers);
  const [pages, setPages] = useState(source.pages);
  const [publishDate, setPublishDate] = useState(source.publish_date);
  const [updateDate, setUpdateDate] = useState(source.update_date);
  const [accessDate, setAccessDate] = useState(source.access_date);

  const [colorEditorOpen, setColorEditorOpen] = useState(false);

  const handleCloseColorEditor = () => {
    setColorEditorOpen(false);
  };

  const handleCancel = () => {
    setName(source.name);
    setColor(source.color);
    setTitle(source.title);
    setAuthors(source.authors);
    setPublishers(source.publishers);
    setPages(source.pages);
    setPublishDate(source.publish_date);
    setUpdateDate(source.update_date);
    setAccessDate(source.access_date);
    handleCloseEditor();
  };

  const handleSave = async () => {
    const originalSource = source;
    await updateSource({
      originalSource,
      name,
      color,
      title,
      authors,
      publishers,
      pages,
      publishDate,
      updateDate,
      accessDate,
    });
    handleCloseEditor();
  };

  return (
    <>
      <Modal
        dismissible
        show={open}
        onClose={handleCancel}
        size="lg"
        className="text-gray-100"
      >
        <ModalHeader>
          <div className="flex items-center gap-2">
            <p>Edit Source</p>
            <ButtonColorToggle onClick={setColorEditorOpen} />
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Name:</h4>
            <TextInput
              id="Name"
              placeholder="Enter Name..."
              className="flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Title:</h4>
            <TextInput
              id="Title"
              placeholder="Enter Title..."
              className="flex-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Author(s):</h4>
            <TextInput
              id="Author"
              placeholder="Enter Author(s)..."
              className="flex-1"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Publisher(s):</h4>
            <TextInput
              id="Publisher"
              placeholder="Enter Publisher(s)..."
              className="flex-1"
              value={publishers}
              onChange={(e) => setPublishers(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Page(s):</h4>
            <TextInput
              id="Pages"
              placeholder="Enter Page(s)..."
              className="flex-1"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Date Published:</h4>
            <TextInput
              id="PublishDate"
              placeholder="Date Published"
              className="flex-1"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Date Updated:</h4>
            <TextInput
              id="UpdateDate"
              placeholder="Date Updated"
              className="flex-1"
              value={updateDate}
              onChange={(e) => setUpdateDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <h4 className="w-32 text-sm font-medium">Date Accessed:</h4>
            <TextInput
              id="AccessDate"
              placeholder="Date Accessed"
              className="flex-1"
              value={accessDate}
              onChange={(e) => setAccessDate(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button onClick={handleSave} color="green">
            Save
          </Button>
        </ModalFooter>
      </Modal>
      <SourceColorEditor
        color={color}
        setColor={setColor}
        open={colorEditorOpen}
        handleCloseColorEditor={handleCloseColorEditor}
      />
    </>
  );
};

export default SourceEditor;
