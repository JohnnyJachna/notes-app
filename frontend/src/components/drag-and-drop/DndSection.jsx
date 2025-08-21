import { useParams, useNavigate } from "react-router";

import Kanban from "./Kanban";

import { Button } from "flowbite-react";

const DndSection = () => {
  const { setID } = useParams();
  const navigate = useNavigate();

  const navToNotes = () => {
    navigate(`/sets/${setID}`);
  };

  return (
    <div className="m-3 p-5">
      <Button onClick={navToNotes}>Back</Button>
      <Kanban />
    </div>
  );
};

export default DndSection;
