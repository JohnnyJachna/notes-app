import { atom } from "jotai";
import { makeRequest } from "../../utils/api";

export const containersAtom = atom([]);
export const containersLoadingAtom = atom(false);
export const containersLoadedAtom = atom(false);

export const fetchContainersAtom = atom(null, async (get, set, setID) => {
  // console.log("fetch containers");

  set(containersLoadingAtom, true);
  set(containersLoadedAtom, false);
  set(containersAtom, []);

  try {
    const response = await makeRequest(`sets/${setID}/containers`);

    set(containersAtom, response);
    set(containersLoadingAtom, false);
    set(containersLoadedAtom, true);
  } catch (error) {
    console.log(error);
    set(containersAtom, []);
  }
});

export const addContainerAtom = atom(null, async (get, set, setID) => {
  console.log("add container");

  try {
    const addedContainer = await makeRequest(`sets/${setID}/containers/add`, {
      method: "POST",
      body: JSON.stringify({
        id: "container-1",
        name: "New Container",
        color: "#1F2937",
        set_id: setID,
      }),
    });
    set(containersAtom, (prevContainers) => [
      ...prevContainers,
      addedContainer,
    ]);
    console.log("addedContainer :", addedContainer);
  } catch (error) {
    console.log(error);
  }
});

export const updateContainerAtom = atom(
  null,
  async (get, set, { container, name, color, containerNotes }) => {
    const updatedContainer = {
      id: container.id,
      name,
      set_id: container.set_id,
      color,
      notes: containerNotes,
    };

    const newContainer = await makeRequest(
      `sets/${container.set_id}/containers`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedContainer),
        headers: { "Content-Type": "application/json" },
      }
    );

    set(containersAtom, (prevContainers) =>
      prevContainers.map((prev) =>
        prev.id === newContainer.id ? newContainer : prev
      )
    );
  }
);

export const deleteContainerAtom = atom(
  null,
  async (get, set, { setID, containerID }) => {
    try {
      await makeRequest(`sets/${setID}/containers/${containerID}`, {
        method: "DELETE",
      });
      set(containersAtom, (prevContainers) =>
        prevContainers.filter((container) => container.id !== containerID)
      );
    } catch (error) {
      console.log(error);
    }
  }
);
