import React, { useState } from "react";
import { Link } from "react-router";
import { deleteSetAtom } from "./SetsAtoms";
import { useAtom, useSetAtom } from "jotai/react";

import SetEditor from "./SetEditor";
import { Button, ButtonGroup } from "flowbite-react";

const Set = (props) => {
  const [set, setSet] = useAtom(props.setAtom);
  const deleteSet = useSetAtom(deleteSetAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteSet = async () => {
    await deleteSet(set.id);
  };

  return (
    <>
      {showEditor ? (
        <SetEditor
          setAtom={props.setAtom}
          setSet={setSet}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <div>
          <Link className="mx-1 px-4" to={`/sets/${set.id}`}>
            {set.name}
          </Link>
          <ButtonGroup>
            <Button onClick={() => setShowEditor(true)}>Edit</Button>
            <Button color="red" onClick={handleDeleteSet}>
              Delete
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default React.memo(Set);
