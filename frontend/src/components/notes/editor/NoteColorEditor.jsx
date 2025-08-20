import { useState } from "react";

import ColorPicker from "@/components/ColorPicker";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const NoteColorEditor = ({ color, setColor, open, handleCloseColorEditor }) => {
  const [newColor, setNewColor] = useState(color);

  const handleCancel = () => {
    setColor(color);
    handleCloseColorEditor();
  };

  const handleSave = () => {
    setColor(newColor);
    handleCloseColorEditor();
  };

  return (
    <Modal
      dismissible
      show={open}
      onClose={handleCancel}
      size="sm"
      className="text-gray-100"
    >
      <ModalHeader>Note Color Editor</ModalHeader>
      <ModalBody className="flex justify-center">
        <ColorPicker value={newColor} onChange={setNewColor} />
      </ModalBody>
      <ModalFooter className="flex justify-center ">
        <Button onClick={handleSave} color="green">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NoteColorEditor;
