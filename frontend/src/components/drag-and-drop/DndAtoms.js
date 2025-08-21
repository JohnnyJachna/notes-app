import { atom } from "jotai";
import { makeRequest } from "../../utils/api";

export const containersAtom = atom([]);
export const containersLoadingAtom = atom(false);
export const containersLoadedAtom = atom(false);

export const fetchContainersAtom = atom(null, async (get, set, setID) => {
  console.log("fetch containers");

  set(containersLoadingAtom, true);
  set(containersLoadedAtom, false);
  set(containersAtom, []);

  try {
    const response = await makeRequest(`sets/${setID}/containers`);
    console.log("response :", response);
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
        notes: [],
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
