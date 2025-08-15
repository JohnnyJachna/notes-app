import { useAtomValue } from "jotai";
import { isSortedAtom, ascendingAtom } from "./NotesListAtoms";

import Button from "../../Button";
import styles from "../../css-modules/NoteList.module.css";

const NotesSortControls = (props) => {
  const isSorted = useAtomValue(isSortedAtom);
  const ascending = useAtomValue(ascendingAtom);

  return (
    <div className={styles.note_list}>
      <Button
        type="button"
        name={isSorted ? "Unsort" : "Sort"}
        onClick={props.onSortToggle}
      />
      <Button
        type="button"
        name={ascending ? "Asc" : "Desc"}
        onClick={props.onOrderToggle}
        disabled={!isSorted}
      />
    </div>
  );
};

export default NotesSortControls;
