import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { notesAtom } from "../notes/NotesAtoms";
import { makeRequest } from "../../utils/api";

export const fetchSourcesAtom = atom(async (get) => {
  // console.log("fetch sources");
  const setID = get(sourcesSetIDAtom);

  if (!setID) {
    return [];
  }

  try {
    const response = await makeRequest(`sets/${setID}/sources`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addSourceAtom = atom(null, async (get, set, newSource) => {
  // console.log("add source");

  try {
    const addedSource = await makeRequest(
      `sets/${newSource.set_id}/sources/add`,
      {
        method: "POST",
        body: JSON.stringify(newSource),
      }
    );
    set(sourcesAtom, (prevSource) => [...prevSource, addedSource]);
  } catch (error) {
    console.log(error);
  }
});

export const updateSourceAtom = atom(
  null,
  async (
    get,
    set,
    {
      originalSource,
      name,
      title,
      authors,
      publishers,
      pages,
      publishDate,
      updateDate,
      accessDate,
    }
  ) => {
    console.log("update source " + originalSource);

    const body = {
      id: originalSource.id,
      name: name,
      title: title,
      authors: authors,
      publishers: publishers,
      pages: pages,
      publish_date: publishDate,
      update_date: updateDate,
      access_date: accessDate,
      set_id: originalSource.set_id,
    };
    console.log("body: " + JSON.stringify(body));
    try {
      await makeRequest(`sets/${originalSource.set_id}/sources`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      set(sourcesAtom, (prevSources) =>
        prevSources.map((prevSource) =>
          prevSource.id === originalSource.id ? body : prevSource
        )
      );

      // Update source name in all notes containing this source
      set(notesAtom, (prevNotes) =>
        prevNotes.map((note) => {
          if (
            note.sources.some(
              (noteSource) => noteSource.id === originalSource.id
            )
          ) {
            return {
              ...note,
              sources: note.sources.map((noteSource) =>
                noteSource.id === originalSource.id
                  ? (noteSource = body)
                  : noteSource
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

export const deleteSourceAtom = atom(null, async (get, set, source) => {
  // console.log("delete source");

  try {
    await makeRequest(`sets/${source.set_id}/sources/${source.id}`, {
      method: "DELETE",
      body: source.set_id,
    });
    set(sourcesAtom, (prevSource) =>
      prevSource.filter((item) => item.id !== source.id)
    );

    // Remove source from all notes containing this source
    set(notesAtom, (prevNotes) =>
      prevNotes.map((note) => {
        if (note.sources.some((t) => t.id === source.id)) {
          return {
            ...note,
            sources: note.sources.filter((t) => t.id !== source.id),
          };
        }
        return note;
      })
    );
  } catch (error) {
    console.log(error);
  }
});

export const loadableSourcesAtom = loadable(fetchSourcesAtom);
export const sourcesAtom = atom([]);
export const splitSourcesAtom = splitAtom(sourcesAtom);
export const sourcesSetIDAtom = atom(null);
