import { useState } from "react";

import SetsList from "./SetsList";
import Button from "../Button";

let setID = 0;

const SetsSection = () => {
  const [setsList, setSetsList] = useState([]);

  const addSet = () => {
    const newSet = { id: setID };
    const updatedSetsList = [...setsList, newSet];

    setSetsList(updatedSetsList);
    setID++;
  };

  const deleteSet = (id) => {
    const newSetsList = setsList.filter((set) => set.id !== id);
    setSetsList(newSetsList);
  };

  return (
    <>
      <SetsList setsList={setsList} handleDeleteSet={deleteSet} />
      <Button type="button" name="Add Set" onClick={addSet} />
    </>
  );
};

export default SetsSection;
