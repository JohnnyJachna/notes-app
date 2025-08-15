import { useAtom } from "jotai/react";
import { sortTypesAtom, sortTypeAtom } from "./NotesListAtoms";

const NotesSortDropdown = () => {
  const sortTypes = useAtom(sortTypesAtom)[0];
  const [sortType, setSortType] = useAtom(sortTypeAtom);

  return (
    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
      {sortTypes.map((str, index) => (
        <option key={index} value={str}>
          {str}
        </option>
      ))}
    </select>
  );
};

export default NotesSortDropdown;
