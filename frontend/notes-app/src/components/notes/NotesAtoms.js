import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { useAPI } from "../../utils/api";

export const fetchNotesAtom = atom(async (get) => {
  // console.log("fetch notes");
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
  // console.log("add note");

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

export const updateNoteAtom = atom(
  null,
  async (get, set, { note, header, content, tags, sources }) => {
    const { makeRequest } = useAPI();

    // 1. Update Note and send PATCH request
    const updatedNote = {
      id: note.id,
      header,
      content,
      create_date: note.create_date,
      update_date: new Date().toLocaleString(),
      set_id: note.set_id,
    };
    console.log("updatedNote: " + JSON.stringify(updatedNote));
    await makeRequest(`sets/${note.set_id}/notes`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: { "Content-Type": "application/json" },
    });

    // 2. Sync tags
    const originalTagIds = note.tags.map((t) => t.id);
    const newTagIds = tags.map((t) => t.id);
    for (const id of newTagIds.filter((id) => !originalTagIds.includes(id))) {
      await makeRequest(`sets/${note.set_id}/notes/${note.id}/tags/${id}`, {
        method: "POST",
      });
    }
    for (const id of originalTagIds.filter((id) => !newTagIds.includes(id))) {
      await makeRequest(`sets/${note.set_id}/notes/${note.id}/tags/${id}`, {
        method: "DELETE",
      });
    }

    // 3. Sync sources
    const originalSourceIds = note.sources.map((s) => s.id);
    const newSourceIds = sources.map((s) => s.id);
    for (const id of newSourceIds.filter(
      (id) => !originalSourceIds.includes(id)
    )) {
      await makeRequest(`sets/${note.set_id}/notes/${note.id}/sources/${id}`, {
        method: "POST",
      });
    }
    for (const id of originalSourceIds.filter(
      (id) => !newSourceIds.includes(id)
    )) {
      await makeRequest(`sets/${note.set_id}/notes/${note.id}/sources/${id}`, {
        method: "DELETE",
      });
    }

    // 4. Fetch updated note
    const refreshed = await makeRequest(
      `sets/${note.set_id}/notes/${note.id}`,
      { method: "GET" }
    );

    // 5. Update only the edited note in the atom
    set(notesAtom, (prevNotes) =>
      prevNotes.map((n) => (n.id === refreshed.id ? refreshed : n))
    );
  }
);

export const deleteNoteAtom = atom(null, async (get, set, note) => {
  // console.log("delete note");

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
