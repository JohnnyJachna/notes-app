import { noteSizeAtom } from "../NotesAtoms";
import { useAtom } from "jotai";

import { Dropdown, DropdownItem } from "flowbite-react";

const NoteSizeDropdown = () => {
  const [noteSize, setNoteSize] = useAtom(noteSizeAtom);

  return (
    <Dropdown label="Note Size" size="sm" className="ml-2">
      <DropdownItem
        value={"small"}
        onClick={() => setNoteSize("small")}
        className={noteSize === "small" ? "bg-blue-100 dark:bg-blue-700" : ""}
      >
        Small
      </DropdownItem>
      <DropdownItem
        value={"medium"}
        onClick={() => setNoteSize("medium")}
        className={noteSize === "medium" ? "bg-blue-100 dark:bg-blue-700" : ""}
      >
        Medium
      </DropdownItem>
      <DropdownItem
        value={"large"}
        onClick={() => setNoteSize("large")}
        className={noteSize === "large" ? "bg-blue-100 dark:bg-blue-700" : ""}
      >
        Large
      </DropdownItem>
      <DropdownItem
        value={"full"}
        onClick={() => setNoteSize("full")}
        className={noteSize === "full" ? "bg-blue-100 dark:bg-blue-700" : ""}
      >
        Full
      </DropdownItem>
    </Dropdown>
  );
};

export default NoteSizeDropdown;
