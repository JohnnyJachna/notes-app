import { atom } from "jotai/vanilla";
import { splitAtom } from "jotai/utils";
import { makeRequest } from "../../utils/api";

export const setsAtom = atom([]);
export const splitSetsAtom = splitAtom(setsAtom);

export const fetchSetsAtom = atom(null, async (get, set) => {
  console.log("fetch sets");

  try {
    const response = await makeRequest(`sets`);
    set(setsAtom, response);
  } catch (error) {
    console.log(error);
    set(setsAtom, []);
  }
});

export const addSetAtom = atom(null, async (get, set) => {
  console.log("add set");
  const date = new Date().toLocaleString();
  try {
    const addedSet = await makeRequest(`sets/add`, {
      method: "POST",
      body: JSON.stringify({
        name: "New Set",
        create_date: date,
        update_date: date,
      }),
    });
    set(setsAtom, (prev) => [...prev, addedSet]);
  } catch (error) {
    console.log(error);
  }
});

export const updateSetAtom = atom(null, async (get, set, updatedSet) => {
  console.log("update set");
  const date = new Date().toLocaleString();

  const body = {
    id: updatedSet.id,
    name: updatedSet.name,
    update_date: date,
  };
  try {
    await makeRequest(`sets`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    set(setsAtom, (prev) =>
      prev.map((set) => (set.id === updatedSet.id ? updatedSet : set))
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
    set(setsAtom, (prev) => prev.filter((set) => set.id !== setID));
  } catch (error) {
    console.log(error);
  }
});
