import { createContext, useContext, useReducer } from "react";

const EditorContext = createContext(null);

const EditorDispatchContext = createContext(null);

export function EditorProvider({ children }) {
  const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);
  const [tags, tagsDispatch] = useReducer(tagsReducer, initialTags);
  const [sources, sourcesDispatch] = useReducer(sourcesReducer, initialSources);

  return (
    <EditorContext value={{ notes, tags, sources }}>
      <EditorDispatchContext
        value={{ notesDispatch, tagsDispatch, sourcesDispatch }}
      >
        {children}
      </EditorDispatchContext>
    </EditorContext>
  );
}

export function useNotes() {
  return useContext(EditorContext);
}
export function useNotesDispatch() {
  return useContext(EditorDispatchContext);
}

export function useTags() {
  return useContext(NotesContext);
}
export function useTagsDispatch() {
  return useContext(NotesDispatchContext);
}

export function useSources() {
  return useContext(NotesContext);
}
export function useSourcesDispatch() {
  return useContext(NotesDispatchContext);
}

function notesReducer(notes, action) {
  switch (action.type) {
    case "note_added": {
      return;
    }
    case "note_updated": {
      return;
    }
    case "note_deleted": {
      return;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function tagsReducer(tags, action) {
  switch (action.type) {
    case "tag_added": {
      return;
    }
    case "tag_updated": {
      return;
    }
    case "tag_deleted": {
      return;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function sourcesReducer(sources, action) {
  switch (action.type) {
    case "source_added": {
      return;
    }
    case "source_updated": {
      return;
    }
    case "source_deleted": {
      return;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialNotes = [];
const initialTags = [];
const initialSources = [];
