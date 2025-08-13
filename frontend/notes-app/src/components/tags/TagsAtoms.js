import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { useAPI } from "../../utils/api";

export const fetchTagsAtom = atom(async (get) => {
  console.log("fetch tags");
  const setID = get(tagsSetIDAtom);

  if (!setID) {
    return [];
  }

  const { makeRequest } = useAPI();
  try {
    const response = await makeRequest(`sets/${setID}/tags`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addTagAtom = atom(null, async (get, set, newTag) => {
  console.log("add tag");

  const { makeRequest } = useAPI();
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
  console.log("update tag");

  const { makeRequest } = useAPI();
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
  } catch (error) {
    console.log(error);
  }
});

export const deleteTagAtom = atom(null, async (get, set, tag) => {
  console.log("delete tag");

  const { makeRequest } = useAPI();
  try {
    await makeRequest(`sets/${tag.set_id}/tags/${tag.id}`, {
      method: "DELETE",
      body: tag.set_id,
    });
    set(tagsAtom, (prevTag) => prevTag.filter((item) => item.id !== tag.id));
  } catch (error) {
    console.log(error);
  }
});

export const loadableTagsAtom = loadable(fetchTagsAtom);
export const tagsAtom = atom([]);
export const splitTagsAtom = splitAtom(tagsAtom);
export const tagsSetIDAtom = atom(null);
