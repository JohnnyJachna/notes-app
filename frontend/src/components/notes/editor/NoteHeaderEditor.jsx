import { Label, TextInput } from "flowbite-react";

const NoteHeaderEditor = ({ header, setHeader }) => {
  return (
    <div>
      <Label htmlFor="note-header" className="mb-2 block">
        Header
      </Label>
      <TextInput
        id="note-header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        placeholder="Enter note header"
        required
      />
    </div>
  );
};

export default NoteHeaderEditor;
