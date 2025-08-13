import { createContext, useContext, useReducer, useEffect } from "react";
import { useAPI } from "../utils/api";

const SetsContext = createContext(null);

const SetsDispatchContext = createContext(null);

export function SetsProvider({ children }) {
  const [sets, dispatch] = useReducer(setsReducer, initialSets);
  const { makeRequest } = useAPI();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        console.log("FETCH SETS");
        const data = await makeRequest("sets");
        dispatch({ type: "set_fetch", data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSets();
  }, []);

  return (
    <SetsContext value={sets}>
      <SetsDispatchContext value={dispatch}>{children}</SetsDispatchContext>
    </SetsContext>
  );
}

export function useSets() {
  return useContext(SetsContext);
}

export function useSetsDispatch() {
  return useContext(SetsDispatchContext);
}

function setsReducer(sets, action) {
  switch (action.type) {
    case "set_fetch": {
      return (sets = action.data);
    }
    case "set_added": {
      return [
        ...sets,
        {
          id: action.addedSet.id,
          name: action.addedSet.name,
          create_date: action.addedSet.create_date,
          update_date: action.addedSet.update_date,
        },
      ];
    }
    case "set_updated": {
      return sets.map((set) => {
        if (set.id === action.set.id) {
          return action.set;
        } else {
          return set;
        }
      });
    }
    case "set_deleted": {
      return sets.filter((set) => set.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialSets = [];
