import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAtom, useSetAtom } from "jotai/react";
import { deleteSetAtom } from "./SetsAtoms";

import SetEditor from "./SetEditor";

import { Card } from "flowbite-react";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

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
    <Card
      className="relative cursor-pointer h-full group"
      onClick={goToDetails}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToDetails();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className="flex items-center gap-2 h-10"
      >
        {showEditor ? (
          <SetEditor
            setAtom={setAtom}
            setSet={setSet}
            handleCloseEditor={handleCloseEditor}
          />
        ) : (
          <>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ButtonEdit onClick={() => setShowEditor(true)} />
              <ButtonDelete onClick={handleDeleteSet} />
            </div>
            <h5
              className="font-semibold truncate pr-16 relative h10 flex items-center"
              title={set.name}
            >
              {set.name}
            </h5>
          </>
        )}
      </div>
    </Card>
  );
};

export default React.memo(Set);
