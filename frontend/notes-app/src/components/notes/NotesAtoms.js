import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { useAPI } from "../../utils/api";

export const fetchNotesAtom = atom(async (get) => {
  console.log("fetch notes");
  const setID = get(notesSetIDAtom);

  if (!setID) {
    return [];
  }

  const { makeRequest } = useAPI();
  try {
    const response = await makeRequest(`sets/${setID}/notes`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addNoteAtom = atom(null, async (get, set, newNote) => {
  console.log("add note");

  const { makeRequest } = useAPI();
  try {
    const addedNote = await makeRequest(`sets/${newNote.set_id}/notes/add`, {
      method: "POST",
      body: JSON.stringify(newNote),
    });
    set(notesAtom, (prevNote) => [...prevNote, addedNote]);
  } catch (error) {
    console.log(error);
  }
});

export const updateNoteAtom = atom(null, async (get, set, updatedNote) => {
  console.log("update note");

  const { makeRequest } = useAPI();
  const body = {
    id: updatedNote.id,
    header: updatedNote.header,
    content: updatedNote.content,
    update_date: updatedNote.update_date,
  };
  try {
    await makeRequest(`sets/${updatedNote.set_id}/notes`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    set(notesAtom, (prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  } catch (error) {
    console.log(error);
  }
});

export const deleteNoteAtom = atom(null, async (get, set, note) => {
  console.log("delete note");

  const { makeRequest } = useAPI();
  try {
    await makeRequest(`sets/${note.set_id}/notes/${note.id}`, {
      method: "DELETE",
      body: note.set_id,
    });
    set(notesAtom, (prevNote) =>
      prevNote.filter((item) => item.id !== note.id)
    );
  } catch (error) {
    console.log(error);
  }
});

export const loadableNotesAtom = loadable(fetchNotesAtom);
export const notesAtom = atom([]);
export const splitNotesAtom = splitAtom(notesAtom);
export const notesSetIDAtom = atom(null);
