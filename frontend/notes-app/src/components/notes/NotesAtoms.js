import { atom } from "jotai/vanilla";
import { splitAtom } from "jotai/utils";
import { makeRequest } from "../../utils/api";

export const notesAtom = atom([]);
export const splitNotesAtom = splitAtom(notesAtom);

export const fetchNotesAtom = atom(null, async (get, set, setID) => {
  // console.log("fetch notes");

  if (!setID) {
    set(notesAtom, []);
    return;
  }

  try {
    const response = await makeRequest(`sets/${setID}/notes`);
    set(notesAtom, response);
  } catch (error) {
    console.log(error);
    set(notesAtom, []);
  }
});

export const addNoteAtom = atom(null, async (get, set, setID) => {
  // console.log("add note");
  const date = new Date().toLocaleString();

  try {
    const addedNote = await makeRequest(`sets/${setID}/notes/add`, {
      method: "POST",
      body: JSON.stringify({
        name: "New Tag",
        header: "",
        content: "",
        create_date: date,
        update_date: date,
        set_id: setID,
      }),
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

    const newNote = await makeRequest(`sets/${note.set_id}/notes`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: { "Content-Type": "application/json" },
    });

    // Update only the edited note in the atom
    set(notesAtom, (prevNotes) =>
      prevNotes.map((prev) => (prev.id === newNote.id ? newNote : prev))
    );
  }
);

export const deleteNoteAtom = atom(
  null,
  async (get, set, { setID, noteID }) => {
    // console.log("delete note");

    try {
      await makeRequest(`sets/${setID}/notes/${noteID}`, {
        method: "DELETE",
      });
      set(notesAtom, (prevNote) =>
        prevNote.filter((item) => item.id !== noteID)
      );
    } catch (error) {
      console.log(error);
    }
  }
);
