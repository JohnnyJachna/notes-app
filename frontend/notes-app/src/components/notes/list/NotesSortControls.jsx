import Button from "../../Button";

const NotesSortControls = (props) => {
  return (
    <div>
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
