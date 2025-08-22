import { useAtom } from "jotai/react";
import { sortTypesAtom, sortTypeAtom } from "./NotesListAtoms";

import { Dropdown, DropdownItem } from "flowbite-react";

const NotesSortDropdown = () => {
  const sortTypes = useAtom(sortTypesAtom)[0];
  const [sortType, setSortType] = useAtom(sortTypeAtom);

  return (
    <Dropdown label="Sort" color="alternative">
      {sortTypes.map((str) => (
        <DropdownItem
          key={str}
          onClick={() => setSortType(str)}
          className={sortType === str ? "bg-blue-100 dark:bg-blue-700" : ""}
        >
          {str}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default NotesSortDropdown;
