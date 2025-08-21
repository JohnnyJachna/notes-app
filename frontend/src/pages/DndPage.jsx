import { useParams, useNavigate } from "react-router";

import { Button } from "flowbite-react";

const DndPage = () => {
  const { setID } = useParams();
  const navigate = useNavigate();

  const navToNotes = () => {
    navigate(`/sets/${setID}`);
  };

  return (
    <div className="m-3 p-5">
      <Button onClick={navToNotes}>Back</Button>
    </div>
  );
};

export default DndPage;
