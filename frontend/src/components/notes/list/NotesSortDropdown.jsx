import { useAtom } from "jotai/react";
import { sortTypesAtom, sortTypeAtom } from "./NotesListAtoms";

import { Dropdown, DropdownItem } from "flowbite-react";

const NotesSortDropdown = () => {
  const sortTypes = useAtom(sortTypesAtom)[0];
  const [sortType, setSortType] = useAtom(sortTypeAtom);

  return (
    <Dropdown label={sortType} color="alternative" className="w-30">
      {sortTypes.map((str) => (
        <DropdownItem key={str} onClick={() => setSortType(str)}>
          {str}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default NotesSortDropdown;
