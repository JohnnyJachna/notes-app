import { atom } from "jotai";
import { notesAtom, splitNotesAtom } from "../NotesAtoms";
import { sortedDndNotesAtom } from "../dnd/DndAtoms";

export const sortTypesAtom = atom([
  "Header",
  "Tags",
  "Sources",
  "Edited",
  "Created",
  "Custom",
]);
export const sortTypeAtom = atom("Created");
export const ascendingAtom = atom(false);

export const filterTypeAtom = atom("Tag");
export const isFilteredAtom = atom(false);

export const tagSelectionAtom = atom("");
export const sourceSelectionAtom = atom("");

export const tagsListAtom = atom((get) =>
  get(notesAtom).flatMap((note) => note.tags)
);

export const tagsNamesAtom = atom((get) => [
  ...new Set(get(tagsListAtom).map((tag) => tag.name)),
]);

export const sourcesListAtom = atom((get) =>
  get(notesAtom).flatMap((note) => note.sources)
);

export const sourcesNamesAtom = atom((get) => [
  ...new Set(get(sourcesListAtom).map((source) => source.name)),
]);

export const tagsAvailableAtom = atom((get) => get(tagsListAtom).length > 0);
export const sourcesAvailableAtom = atom(
  (get) => get(sourcesListAtom).length > 0
);

// Filtering
export const filteredNotesAtom = atom((get) => {
  const notesList = get(notesAtom);
  const isFiltered = get(isFilteredAtom);
  const filterType = get(filterTypeAtom);
  const tagSelection = get(tagSelectionAtom);
  const sourceSelection = get(sourceSelectionAtom);

  if (!isFiltered) return notesList;

  if (filterType === "Tag") {
    return notesList.filter((note) =>
      note.tags.some((noteTag) => noteTag.name === tagSelection)
    );
  } else {
    return notesList.filter((note) =>
      note.sources.some((noteSource) => noteSource.name === sourceSelection)
    );
  }
});

// Sorting
export const sortedNotesAtom = atom((get) => {
  const notesList = get(notesAtom);
  const ascending = get(ascendingAtom);
  const sortType = get(sortTypeAtom);

  let sortedArray = [...notesList];
  switch (sortType) {
    case "Header":
      sortedArray.sort((a, b) => {
        const nameA = a.header?.toLowerCase() ?? "";
        const nameB = b.header?.toLowerCase() ?? "";
        if (nameA < nameB) return ascending ? -1 : 1;
        if (nameA > nameB) return ascending ? 1 : -1;
        return 0;
      });
      break;
    case "Tags":
      sortedArray.sort((a, b) => {
        const tagsA = a.tags.length;
        const tagsB = b.tags.length;
        if (tagsA < tagsB) return ascending ? -1 : 1;
        if (tagsA > tagsB) return ascending ? 1 : -1;
        return 0;
      });
      break;
    case "Sources":
      sortedArray.sort((a, b) => {
        const sourcesA = a.sources.length;
        const sourcesB = b.sources.length;
        if (sourcesA < sourcesB) return ascending ? -1 : 1;
        if (sourcesA > sourcesB) return ascending ? 1 : -1;
        return 0;
      });
      break;
    case "Edited":
      sortedArray.sort((a, b) => {
        const updateA = new Date(a.update_date);
        const updateB = new Date(b.update_date);
        if (updateA < updateB) return ascending ? -1 : 1;
        if (updateA > updateB) return ascending ? 1 : -1;
        return 0;
      });
      break;
    case "Created":
      sortedArray.sort((a, b) => {
        const createA = new Date(a.create_date);
        const createB = new Date(b.create_date);
        if (createA < createB) return ascending ? -1 : 1;
        if (createA > createB) return ascending ? 1 : -1;
        return 0;
      });
      break;
    case "Custom":
      {
        const sortedDndNotes = get(sortedDndNotesAtom);
        sortedArray = sortedDndNotes;
      }
      break;
    default:
      return notesList;
  }
  return sortedArray;
});

// Combine sorting and filtering
export const refinedNotesAtom = atom((get) => {
  const isFiltered = get(isFilteredAtom);
  const sortedNotes = get(sortedNotesAtom);
  const filteredNotes = get(filteredNotesAtom);

  if (!isFiltered) return sortedNotes;
  return sortedNotes.filter((sNote) =>
    filteredNotes.some((fNote) => fNote.id === sNote.id)
  );
});

export const refinedNotesSplitAtom = atom((get) => {
  const notesList = get(notesAtom);
  const splitNotesList = get(splitNotesAtom);
  const refinedNotes = get(refinedNotesAtom);

  return refinedNotes.map((note) =>
    splitNotesList.find((_, index) => notesList[index].id === note.id)
  );
});
