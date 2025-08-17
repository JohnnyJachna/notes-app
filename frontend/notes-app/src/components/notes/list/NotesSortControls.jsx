import { useAtomValue } from "jotai";
import { isSortedAtom, ascendingAtom } from "./NotesListAtoms";

import { Button, ButtonGroup } from "flowbite-react";

const NotesSortControls = (props) => {
  const isSorted = useAtomValue(isSortedAtom);
  const ascending = useAtomValue(ascendingAtom);

  return (
    <div>
      <ButtonGroup>
        <Button onClick={props.onSortToggle} color="alternative">
          {isSorted ? "Unsort" : "Sort"}
        </Button>
        <Button
          onClick={props.onOrderToggle}
          disabled={!isSorted}
          color="alternative"
        >
          {ascending ? "Asc" : "Desc"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default NotesSortControls;
