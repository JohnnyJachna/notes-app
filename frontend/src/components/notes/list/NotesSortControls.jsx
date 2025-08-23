import { useAtomValue } from "jotai";
import { ascendingAtom } from "./NotesListAtoms";

import { Button, ButtonGroup } from "flowbite-react";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";

const NotesSortControls = (props) => {
  const ascending = useAtomValue(ascendingAtom);

  return (
    <div>
      <Button
        onClick={props.onOrderToggle}
        color="alternative"
        className="w-23"
      >
        <span className="mr-1.5">Sort</span>
        {ascending ? <FaSortAmountUpAlt /> : <FaSortAmountDown />}
      </Button>
    </div>
  );
};

export default NotesSortControls;
