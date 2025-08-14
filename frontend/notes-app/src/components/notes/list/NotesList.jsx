import React, { useState, useMemo } from "react";

import { notesAtom, splitNotesAtom } from "../NotesAtoms";
import { useAtomValue } from "jotai/react";

import NotesSortControls from "./NotesSortControls";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesListItems from "./NotesListItems";

const NotesList = () => {
  const types = ["Header", "Tags", "Sources", "Edited", "Created"];
  const notesList = useAtomValue(notesAtom);
  const noteAtoms = useAtomValue(splitNotesAtom);
  const [isSorted, setIsSorted] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [sortType, setSortType] = useState("Header");

  const sortedNotes = useMemo(() => {
    if (!isSorted) return notesList;
    const sortedArray = [...notesList];
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
          const createA = new Date(a.update_date);
          const createB = new Date(b.update_date);
          if (createA < createB) return ascending ? -1 : 1;
          if (createA > createB) return ascending ? 1 : -1;
          return 0;
        });
        break;
      default:
        return notesList;
    }
    return sortedArray;
  }, [notesList, isSorted, ascending, sortType]);

  const sortedNoteAtoms = useMemo(() => {
    return sortedNotes.map((note) =>
      noteAtoms.find((_, index) => notesList[index].id === note.id)
    );
  }, [sortedNotes, notesList, noteAtoms]);

  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
  };

  const handleOrderToggle = () => {
    setAscending((prev) => !prev);
  };

  return (
    <>
      <h4>Notes List</h4>
      {notesList.length > 0 && (
        <NotesSortControls
          isSorted={isSorted}
          ascending={ascending}
          onSortToggle={handleSortToggle}
          onOrderToggle={handleOrderToggle}
          disabled={!isSorted}
        />
      )}
      <NotesSortDropdown
        types={types}
        sortType={sortType}
        setSortType={setSortType}
      />
      <NotesListItems
        sortedNoteAtoms={sortedNoteAtoms}
        sortedNotes={sortedNotes}
      />
    </>
  );
};

export default React.memo(NotesList);
