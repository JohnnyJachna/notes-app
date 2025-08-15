import React, { useState, useEffect, useMemo } from "react";

import { notesAtom, splitNotesAtom } from "../NotesAtoms";
import { useAtomValue } from "jotai/react";

import NotesSortControls from "./NotesSortControls";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesListItems from "./NotesListItems";
import styles from "../../css-modules/NoteList.module.css";
import Button from "../../Button";

const NotesList = () => {
  const sortTypes = ["Header", "Tags", "Sources", "Edited", "Created"];
  const notesList = useAtomValue(notesAtom);
  const noteAtoms = useAtomValue(splitNotesAtom);

  const [sortType, setSortType] = useState("Header");
  const [isSorted, setIsSorted] = useState(false);
  const [ascending, setAscending] = useState(true);

  const [filterType, setFilterType] = useState("Tag");
  const [isFiltered, setIsFiltered] = useState(false);

  const [tagSelection, setTagSelection] = useState();
  const tagsList = notesList.flatMap((note) => note.tags);
  const tagsNames = useMemo(
    () => [...new Set(tagsList.map((tag) => tag.name))],
    [tagsList]
  );

  const [sourceSelection, setSourceSelection] = useState();
  const sourcesList = notesList.flatMap((note) => note.sources);
  const sourcesNames = useMemo(
    () => [...new Set(sourcesList.map((source) => source.name))],
    [sourcesList]
  );

  const tagsAvailable = tagsList.length > 0 ? true : false;
  const sourcesAvailable = sourcesList.length > 0 ? true : false;

  useEffect(() => {
    if (!tagSelection && tagsNames.length > 0) {
      setTagSelection(tagsNames[0]);
    }
    if (!sourceSelection && sourcesNames.length > 0) {
      setSourceSelection(sourcesNames[0]);
    }
  }, [notesList]);

  const filteredNotes = useMemo(() => {
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
  }, [notesList, isFiltered, filterType, tagSelection, sourceSelection]);

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

  const refinedNotes = useMemo(() => {
    if (!isSorted && !isFiltered) return notesList;
    if (!isSorted) return filteredNotes;
    if (!isFiltered) return sortedNotes;

    return sortedNotes.filter((sNote) =>
      filteredNotes.some((fNote) => fNote.id === sNote.id)
    );
  }, [sortedNotes, filteredNotes]);

  const refinedNoteAtoms = useMemo(() => {
    return refinedNotes.map((note) =>
      noteAtoms.find((_, index) => notesList[index].id === note.id)
    );
  }, [refinedNotes, notesList, noteAtoms]);

  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
  };

  const handleOrderToggle = () => {
    setAscending((prev) => !prev);
  };

  const handleFilterToggle = () => {
    setIsFiltered((prev) => !prev);
  };

  return (
    <>
      <h4>Notes List</h4>
      {notesList.length > 0 && (
        <div className={styles.note_list}>
          <NotesSortControls
            isSorted={isSorted}
            ascending={ascending}
            onSortToggle={handleSortToggle}
            onOrderToggle={handleOrderToggle}
            disabled={!isSorted}
          />
          <NotesSortDropdown
            types={sortTypes}
            sortType={sortType}
            setSortType={setSortType}
          />
          {/* Filtering */}
          {(tagsAvailable || sourcesAvailable) && (
            <>
              <Button
                type="button"
                name={isFiltered ? "Unfilter" : "Filter"}
                onClick={handleFilterToggle}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {tagsAvailable && (
                  <option key={"Tag"} value="Tag">
                    Tag
                  </option>
                )}
                {sourcesAvailable && (
                  <option key={"Soruce"} value="Source">
                    Source
                  </option>
                )}
              </select>
              {filterType === "Tag" ? (
                <select
                  value={tagSelection}
                  onChange={(e) => setTagSelection(e.target.value)}
                >
                  {tagsNames.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={sourceSelection}
                  onChange={(e) => setSourceSelection(e.target.value)}
                >
                  {sourcesNames.map((source, index) => (
                    <option key={index} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </div>
      )}

      <NotesListItems
        sortedNoteAtoms={refinedNoteAtoms}
        sortedNotes={refinedNotes}
      />
    </>
  );
};

export default React.memo(NotesList);
