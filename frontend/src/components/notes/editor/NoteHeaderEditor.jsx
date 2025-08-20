import { Label, TextInput } from "flowbite-react";

const NoteHeaderEditor = ({ header, setHeader }) => {
  return (
    <div className="flex gap-2 items-baseline">
      <Label htmlFor="note-header" className="block !text-base">
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
