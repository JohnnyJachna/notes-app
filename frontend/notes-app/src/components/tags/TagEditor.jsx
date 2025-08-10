import { useState } from "react";
import { useAPI } from "../../utils/api";

import Button from "../Button";

const TagEditor = ({ tag, closeEditor }) => {
  const [name, setName] = useState(tag.name);
  const { makeRequest } = useAPI();

  const updateName = async () => {
    const body = {
      id: tag.id,
      name: name,
    };

    try {
      await makeRequest(`sets/${tag.set_id}/tags`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (name !== tag.name) {
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

export default TagEditor;
