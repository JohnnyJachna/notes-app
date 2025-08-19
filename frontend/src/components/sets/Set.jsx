import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAtom, useSetAtom } from "jotai/react";
import { deleteSetAtom } from "./SetsAtoms";

import SetEditor from "./SetEditor";
import { Card, Button } from "flowbite-react";

const Set = ({ setAtom }) => {
  const [set, setSet] = useAtom(setAtom);
  const deleteSet = useSetAtom(deleteSetAtom);

  const [showEditor, setShowEditor] = useState(false);
  const navigate = useNavigate();

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteSet = async () => {
    await deleteSet(set.id);
  };

  const goToDetails = () => navigate(`/sets/${set.id}`);

  return (
    <>
      {showEditor ? (
        <SetEditor
          setAtom={setAtom}
          setSet={setSet}
          handleCloseEditor={handleCloseEditor}
        />
      ) : (
        <Card
          className="cursor-pointer h-full"
          onClick={goToDetails}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goToDetails();
            }
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h5 className="font-semibold group-hover:underline">
                {set.name}
              </h5>
            </div>
            <div
              className="flex gap-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Button size="xs" onClick={() => setShowEditor(true)}>
                Edit
              </Button>
              <Button size="xs" color="red" onClick={handleDeleteSet}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default React.memo(Set);
