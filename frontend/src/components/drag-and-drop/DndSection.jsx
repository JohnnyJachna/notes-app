import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { useAtomValue, useSetAtom } from "jotai";
import {
  containersAtom,
  addContainerAtom,
  fetchContainersAtom,
  containersLoadingAtom,
  containersLoadedAtom,
} from "./DndAtoms";

import Kanban from "./Kanban";

import { Button, Spinner } from "flowbite-react";

const DndSection = () => {
  const { setID } = useParams();
  const navigate = useNavigate();

  const containers = useAtomValue(containersAtom);
  const addContainer = useSetAtom(addContainerAtom);
  const fetchContainers = useSetAtom(fetchContainersAtom);
  const isLoading = useAtomValue(containersLoadingAtom);
  const containersLoaded = useAtomValue(containersLoadedAtom);

  useEffect(() => {
    if (containersLoaded) return;
    fetchContainers(setID);
  }, [setID, fetchContainers]);

  const handleAddContainer = async () => {
    await addContainer(setID);
  };

  const navToNotes = () => {
    navigate(`/sets/${setID}`);
  };

  // console.log("Containers: " + JSON.stringify(containers));

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="m-3 p-5">
          <div className="mb-5 flex gap-2">
            <Button onClick={navToNotes}>Back</Button>
            <Button onClick={handleAddContainer}>Add Container</Button>
          </div>
          <Kanban />
        </div>
      )}
    </>
  );
};

export default DndSection;
