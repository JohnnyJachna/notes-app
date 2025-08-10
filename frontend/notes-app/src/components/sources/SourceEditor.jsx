import { useState } from "react";
import { useAPI } from "../../utils/api";

import Button from "../Button";

const SourceEditor = ({ source, closeEditor }) => {
  const [name, setName] = useState(source.name);
  const { makeRequest } = useAPI();

  const updateName = async () => {
    const body = {
      id: source.id,
      name: name,
    };

    try {
      await makeRequest(`sets/${source.set_id}/sources`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (name !== source.name) {
      updateName();
    }
    closeEditor(name);
  };

  return (
    <>
      <textarea
        id="Name"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <Button type="button" name="Done" onClick={handleClick} />
    </>
  );
};

export default SourceEditor;
