import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { makeRequest } from "../../utils/api";

export const fetchNotesAtom = atom(async (get) => {
  // console.log("fetch notes");
  const setID = get(notesSetIDAtom);

  if (!setID) {
    return [];
  }

  try {
    const response = await makeRequest(`sets/${setID}/notes`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addNoteAtom = atom(null, async (get, set, newNote) => {
  // console.log("add note");

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
  async (get, set, { note, header, content, noteTags, noteSources }) => {
    const updatedNote = {
      id: note.id,
      header,
      content,
      create_date: note.create_date,
      update_date: new Date().toLocaleString(),
      set_id: note.set_id,
      tags: noteTags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        set_id: tag.set_id,
      })),
      sources: noteSources.map((src) => ({
        id: src.id,
        name: src.name,
        title: src.title ?? null,
        authors: src.authors ?? null,
        publishers: src.publishers ?? null,
        pages: src.pages ?? null,
        publish_date: src.publish_date ?? null,
        update_date: src.update_date ?? null,
        access_date: src.access_date ?? null,
        set_id: src.set_id,
      })),
    };

    const refreshed = await makeRequest(`sets/${note.set_id}/notes`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: { "Content-Type": "application/json" },
    });

    // Update only the edited note in the atom
    set(notesAtom, (prevNotes) =>
      prevNotes.map((n) => (n.id === refreshed.id ? refreshed : n))
    );
  }
);

export const deleteNoteAtom = atom(null, async (get, set, note) => {
  // console.log("delete note");

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
