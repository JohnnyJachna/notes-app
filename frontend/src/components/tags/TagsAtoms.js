import { atom } from "jotai/vanilla";
import { splitAtom } from "jotai/utils";
import { notesAtom } from "../notes/NotesAtoms";
import { makeRequest } from "../../utils/api";

export const tagsAtom = atom([]);
export const splitTagsAtom = splitAtom(tagsAtom);

export const fetchTagsAtom = atom(null, async (get, set, setID) => {
  // console.log("fetch tags");

  if (!setID) {
    set(tagsAtom, []);
    return;
  }
  try {
    const response = await makeRequest(`sets/${setID}/tags`);
    set(tagsAtom, response);
  } catch (error) {
    console.log(error);
    set(tagsAtom, []);
  }
});

export const addTagAtom = atom(null, async (get, set, setID) => {
  // console.log("add tag");

  try {
    const addedTag = await makeRequest(`sets/${setID}/tags/add`, {
      method: "POST",
      body: JSON.stringify({
        name: "New Tag",
        color: "yellow",
        set_id: setID,
      }),
    });
    set(tagsAtom, (prev) => [...prev, addedTag]);
  } catch (error) {
    console.log(error);
  }
});

export const updateTagAtom = atom(
  null,
  async (get, set, { setID, tagID, name, color }) => {
    // console.log("update tag");

    const updatedTag = {
      id: tagID,
      name: name,
      color: color,
      set_id: setID,
    };
    try {
      await makeRequest(`sets/${setID}/tags`, {
        method: "PATCH",
        body: JSON.stringify(updatedTag),
      });
      set(tagsAtom, (prev) =>
        prev.map((tag) => (tag.id === tagID ? updatedTag : tag))
      );

      // Update tag name in all notes containing this tag
      set(notesAtom, (prev) =>
        prev.map((note) => {
          if (note.tags.some((tag) => tag.id === tagID)) {
            return {
              ...note,
              tags: note.tags.map((tag) =>
                tag.id === tagID ? { ...tag, name: name } : tag
              ),
            };
          }
          return note;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTagAtom = atom(null, async (get, set, { setID, tagID }) => {
  // console.log("delete tag");

  try {
    await makeRequest(`sets/${setID}/tags/${tagID}`, {
      method: "DELETE",
    });
    set(tagsAtom, (prev) => prev.filter((tag) => tag.id !== tagID));

    // Remove tag from all notes containing this tag
    set(notesAtom, (prev) =>
      prev.map((note) => {
        if (note.tags.some((t) => t.id === tagID)) {
          return {
            ...note,
            tags: note.tags.filter((t) => t.id !== tagID),
          };
        }
        return note;
      })
    );
  } catch (error) {
    console.log(error);
  }
});
