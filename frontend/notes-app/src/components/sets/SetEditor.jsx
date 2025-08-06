import { useState } from "react";
import { useEffect } from "react";

import Button from "../Button";

const SetEditor = ({ set, closeEditor }) => {
  const [name, setName] = useState();

  useEffect(() => {
    setName(set.name);
  }, []);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    closeEditor({
      id: set.id,
      name: name,
    });
  };

  return (
    <>
      <textarea
        id="Name"
        placeholder="Name..."
        value={name}
        onChange={updateName}
      ></textarea>
      <Button type="button" name="Done" onClick={handleClick} />
    </>
  );
};

export default SetEditor;
