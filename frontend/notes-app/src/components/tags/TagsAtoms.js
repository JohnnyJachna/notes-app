import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { notesAtom } from "../notes/NotesAtoms";
import { makeRequest } from "../../utils/api";

export const fetchTagsAtom = atom(async (get) => {
  // console.log("fetch tags");
  const setID = get(tagsSetIDAtom);

  if (!setID) {
    return [];
  }

  try {
    const response = await makeRequest(`sets/${setID}/tags`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addTagAtom = atom(null, async (get, set, newTag) => {
  // console.log("add tag");

  try {
    const addedTag = await makeRequest(`sets/${newTag.set_id}/tags/add`, {
      method: "POST",
      body: JSON.stringify(newTag),
    });
    set(tagsAtom, (prevTag) => [...prevTag, addedTag]);
  } catch (error) {
    console.log(error);
  }
});

export const updateTagAtom = atom(null, async (get, set, updatedTag) => {
  // console.log("update tag");

  const body = {
    id: updatedTag.id,
    name: updatedTag.name,
  };
  try {
    await makeRequest(`sets/${updatedTag.set_id}/tags`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    set(tagsAtom, (prevTags) =>
      prevTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );

    // Update tag name in all notes containing this tag
    set(notesAtom, (prevNotes) =>
      prevNotes.map((note) => {
        if (note.tags.some((tag) => tag.id === updatedTag.id)) {
          return {
            ...note,
            tags: note.tags.map((tag) =>
              tag.id === updatedTag.id ? { ...tag, name: updatedTag.name } : tag
            ),
          };
        }
        return note;
      })
    );
  } catch (error) {
    console.log(error);
  }
});

export const deleteTagAtom = atom(null, async (get, set, tag) => {
  try {
    await makeRequest(`sets/${tag.set_id}/tags/${tag.id}`, {
      method: "DELETE",
      body: tag.set_id,
    });
    set(tagsAtom, (prevTag) => prevTag.filter((item) => item.id !== tag.id));

    // Remove tag from all notes containing this tag
    set(notesAtom, (prevNotes) =>
      prevNotes.map((note) => {
        if (note.tags.some((t) => t.id === tag.id)) {
          return {
            ...note,
            tags: note.tags.filter((t) => t.id !== tag.id),
          };
        }
        return note;
      })
    );
  } catch (error) {
    console.log(error);
  }
});

export const loadableTagsAtom = loadable(fetchTagsAtom);
export const tagsAtom = atom([]);
export const splitTagsAtom = splitAtom(tagsAtom);
export const tagsSetIDAtom = atom(null);
