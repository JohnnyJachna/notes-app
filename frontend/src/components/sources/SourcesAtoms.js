import { atom } from "jotai/vanilla";
import { splitAtom } from "jotai/utils";
import { notesAtom } from "../notes/NotesAtoms";
import { makeRequest } from "../../utils/api";

export const sourcesAtom = atom([]);
export const splitSourcesAtom = splitAtom(sourcesAtom);

export const fetchSourcesAtom = atom(null, async (get, set, setID) => {
  // console.log("fetch sources");

  if (!setID) {
    set(sourcesAtom, []);
    return;
  }
  try {
    const response = await makeRequest(`sets/${setID}/sources`);
    set(sourcesAtom, response);
  } catch (error) {
    console.log(error);
    set(sourcesAtom, []);
  }
});

export const addSourceAtom = atom(null, async (get, set, setID) => {
  // console.log("add source");

  try {
    const addedSource = await makeRequest(`sets/${setID}/sources/add`, {
      method: "POST",
      body: JSON.stringify({
        name: "New Source",
        color: "F8E61B",
        set_id: setID,
      }),
    });
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
      color,
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
      color: color,
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

export const deleteSourceAtom = atom(
  null,
  async (get, set, { setID, sourceID }) => {
    // console.log("delete source");

    try {
      await makeRequest(`sets/${setID}/sources/${sourceID}`, {
        method: "DELETE",
      });
      set(sourcesAtom, (prev) =>
        prev.filter((source) => source.id !== sourceID)
      );

      // Remove source from all notes containing this source
      set(notesAtom, (prev) =>
        prev.map((note) => {
          if (note.sources.some((t) => t.id === sourceID)) {
            return {
              ...note,
              sources: note.sources.filter((t) => t.id !== sourceID),
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
