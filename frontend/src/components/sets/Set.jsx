import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAtom, useSetAtom } from "jotai/react";
import { updateSetAtom, deleteSetAtom } from "./SetsAtoms";
import { fetchNotesAtom } from "../notes/NotesAtoms";

import SetEditor from "./SetEditor";

import { Card, Spinner } from "flowbite-react";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

const Set = ({ setAtom }) => {
  const [set, setSet] = useAtom(setAtom);
  const updateSet = useSetAtom(updateSetAtom);
  const deleteSet = useSetAtom(deleteSetAtom);
  const fetchNotes = useSetAtom(fetchNotesAtom);

  const [showEditor, setShowEditor] = useState(false);
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteSet = async () => {
    await deleteSet(set.id);
  };

  const navToSet = async () => {
    if (!showEditor) {
      setOpening(true);
      await fetchNotes(set.id);
      navigate(`/sets/${set.id}`);
      await updateSet(set);
    }
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
      {!opening ? (
        <>
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
              <h5
                className="font-semibold truncate pr-16 w-full"
                title={set.name}
              >
                {set.name}
              </h5>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        </>
      )}
    </Card>
  );
};

export default React.memo(Set);
