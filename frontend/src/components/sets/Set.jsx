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

  const navToSet = () => {
    if (!showEditor) navigate(`/sets/${set.id}`);
  };

  return (
    <Card
      className="relative cursor-pointer group select-none"
      onClick={navToSet}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !showEditor) {
          e.preventDefault();
          navToSet();
        }
      }}
    >
      {!showEditor && (
        <div
          className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ButtonEdit onClick={() => setShowEditor(true)} />
          <ButtonDelete onClick={handleDeleteSet} />
        </div>
      )}

      {showEditor ? (
        <div
          className="flex items-center h-10"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <SetEditor
            setAtom={setAtom}
            setSet={setSet}
            handleCloseEditor={handleCloseEditor}
          />
        </div>
      ) : (
        <div className="flex items-center h-10">
          <h5 className="font-semibold truncate pr-16 w-full" title={set.name}>
            {set.name}
          </h5>
        </div>
      )}
    </Card>
  );
};

export default React.memo(Set);
