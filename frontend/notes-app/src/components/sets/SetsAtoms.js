import { atom } from "jotai/vanilla";
import { loadable } from "jotai/utils";

export const fetchSetsAtom = atom(
  (get) => get(setsAtom),
  async (get, set) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sets`);
    const data = await response.json();
    set(setsAtom, data);
  }
);

export const addSetAtom = atom(null, async (get, set, newSet) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sets/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSet),
    });
    if (!response.ok) {
      throw new Error("Failed to add item");
    }
    const addedItem = await response.json();
    set(setsAtom, (prevSet) => [...prevSet, addedItem]);
  } catch (error) {
    console.error("Error adding item:", error);
  }
});

export const deleteSetAtom = atom(null, async (get, set, setID) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/sets`, {
      method: "DELETE",
      body: setID,
    });
    set(setsAtom, (prevSet) => prevSet.filter((item) => item.id !== setID));
  } catch (error) {
    console.error("Error deleting item:", error);
  }
});

export const loadableSetsAtom = loadable(fetchSetsAtom);
export const setsAtom = atom([]);
