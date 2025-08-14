import { atom } from "jotai/vanilla";
import { loadable, splitAtom } from "jotai/utils";
import { notesAtom } from "../notes/NotesAtoms";
import { useAPI } from "../../utils/api";

export const fetchSourcesAtom = atom(async (get) => {
  // console.log("fetch sources");
  const setID = get(sourcesSetIDAtom);

  if (!setID) {
    return [];
  }

  const { makeRequest } = useAPI();
  try {
    const response = await makeRequest(`sets/${setID}/sources`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addSourceAtom = atom(null, async (get, set, newSource) => {
  // console.log("add source");

  const { makeRequest } = useAPI();
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

export const updateSourceAtom = atom(null, async (get, set, updatedSource) => {
  // console.log("update source");

  const { makeRequest } = useAPI();
  const body = {
    id: updatedSource.id,
    name: updatedSource.name,
  };
  try {
    await makeRequest(`sets/${updatedSource.set_id}/sources`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    set(sourcesAtom, (prevSources) =>
      prevSources.map((source) =>
        source.id === updatedSource.id ? updatedSource : source
      )
    );

    // Update source name in all notes containing this source
    set(notesAtom, (prevNotes) =>
      prevNotes.map((note) => {
        if (note.sources.some((source) => source.id === updatedSource.id)) {
          return {
            ...note,
            sources: note.sources.map((source) =>
              source.id === updatedSource.id
                ? { ...source, name: updatedSource.name }
                : source
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

export const deleteSourceAtom = atom(null, async (get, set, source) => {
  // console.log("delete source");

  const { makeRequest } = useAPI();
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
