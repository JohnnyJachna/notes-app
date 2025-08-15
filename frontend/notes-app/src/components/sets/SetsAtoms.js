import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { makeRequest } from "../../utils/api";

export const fetchSetsAtom = atom(async () => {
  console.log("fetch sets");

  try {
    const response = await makeRequest(`sets`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addSetAtom = atom(null, async (get, set, newSet) => {
  console.log("add set");

  try {
    const addedSet = await makeRequest(`sets/add`, {
      method: "POST",
      body: JSON.stringify(newSet),
    });
    set(setsAtom, (prevSet) => [...prevSet, addedSet]);
  } catch (error) {
    console.log(error);
  }
});

export const updateSetAtom = atom(null, async (get, set, updatedSet) => {
  console.log("update set");

  const body = {
    id: updatedSet.id,
    name: updatedSet.name,
  };
  try {
    await makeRequest(`sets`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    set(setsAtom, (prevSets) =>
      prevSets.map((set) => (set.id === updatedSet.id ? updatedSet : set))
    );
  } catch (error) {
    console.log(error);
  }
});

export const deleteSetAtom = atom(null, async (get, set, setID) => {
  console.log("delete set");

  try {
    await makeRequest(`sets/${setID}`, {
      method: "DELETE",
      body: setID,
    });
    set(setsAtom, (prevSet) => prevSet.filter((item) => item.id !== setID));
  } catch (error) {
    console.log(error);
  }
});

export const loadableSetsAtom = loadable(fetchSetsAtom);
export const setsAtom = atom([]);
export const splitSetsAtom = splitAtom(setsAtom);
