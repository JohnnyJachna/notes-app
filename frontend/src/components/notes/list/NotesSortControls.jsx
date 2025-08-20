import { useAtomValue } from "jotai";
import { ascendingAtom } from "./NotesListAtoms";

import { Button, ButtonGroup } from "flowbite-react";

const NotesSortControls = (props) => {
  const ascending = useAtomValue(ascendingAtom);

  return (
    <div>
      <Button
        onClick={props.onOrderToggle}
        color="alternative"
        className="w-15"
      >
        {ascending ? "Asc" : "Desc"}
      </Button>
    </div>
  );
};

export default NotesSortControls;
