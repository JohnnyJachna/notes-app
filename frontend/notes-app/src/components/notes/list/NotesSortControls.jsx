import Button from "../../Button";
import styles from "../../css-modules/NoteList.module.css";

const NotesSortControls = (props) => {
  return (
    <div className={styles.note_list}>
      <Button
        type="button"
        name={props.isSorted ? "Unsort" : "Sort"}
        onClick={props.onSortToggle}
      />
      <Button
        type="button"
        name={props.ascending ? "Asc" : "Desc"}
        onClick={props.onOrderToggle}
        disabled={props.disabled}
      />
    </div>
  );
};

export default NotesSortControls;
