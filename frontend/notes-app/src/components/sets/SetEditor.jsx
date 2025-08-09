import { useState } from "react";
// import { useEffect } from "react";
import { useAPI } from "../../utils/api";

import Button from "../Button";

const SetEditor = ({ set, closeEditor }) => {
  const [name, setName] = useState(set.name);
  const { makeRequest } = useAPI();

  console.log(name);

  const updateName = async () => {
    const body = {
      id: set.id,
      name: name,
    };
    console.log(body);
    try {
      const response = await makeRequest("sets", {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (name !== set.name) {
      console.log("true");
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

export default SetEditor;
