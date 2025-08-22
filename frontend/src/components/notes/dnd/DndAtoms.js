import { atom } from "jotai";
import { notesAtom } from "../NotesAtoms";

export const isDndActiveAtom = atom(false);

export const sortedDndNotesAtom = atom((get) => {
  const notes = get(notesAtom);

  const sortedNotes = [...notes];

  const notesWithPosition = sortedNotes.filter(
    (note) => note.position !== null
  );
  const notesWithoutPosition = sortedNotes.filter(
    (note) => note.position === null
  );

  notesWithPosition.sort((a, b) => a.position - b.position);

  return [...notesWithPosition, ...notesWithoutPosition];
});

export const saveDndNotesPositionsAtom = atom(
  null,
  async (get, set, newSortedList) => {
    const updatedNotes = newSortedList.map((note, index) => ({
      ...note,
      position: index,
    }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/positions`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNotes),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save note positions");
      }
      set(notesAtom, updatedNotes);

      console.log("Note positions saved successfully!");
    } catch (error) {
      console.error("Error saving note positions:", error);
    }
  }
);
