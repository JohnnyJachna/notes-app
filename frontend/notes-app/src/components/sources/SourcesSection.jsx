import { useState } from "react";

import SourcesList from "./SourcesList";
import Button from "../Button";

let sourceID = 0;

const SourcesSection = () => {
  const [sourcesList, setSourcesList] = useState([]);

  const addSource = () => {
    const newSource = { id: sourceID };
    const updatedSourcesList = [...sourcesList, newSource];

    setSourcesList(updatedSourcesList);
    sourceID++;
  };

  const deleteSource = (id) => {
    const newSourcesList = sourcesList.filter((source) => source.id !== id);
    setSourcesList(newSourcesList);
  };

  return (
    <>
      <SourcesList
        sourcesList={sourcesList}
        handleDeleteSource={deleteSource}
      />
      <Button type="button" name="Add Source" onClick={addSource} />
    </>
  );
};

export default SourcesSection;
