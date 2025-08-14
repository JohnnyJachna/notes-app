import { useState, useEffect, useMemo } from "react";
import { sourcesAtom } from "../../sources/SourcesAtoms";
import { useAtomValue } from "jotai/react";

import Button from "../../Button";

const NoteSourcesEditor = ({ sources, setSources }) => {
  const allSources = useAtomValue(sourcesAtom);

  const addableSources = useMemo(
    () =>
      allSources.filter(
        (src) => !sources.some((noteSrc) => noteSrc.id === src.id)
      ),
    [allSources, sources]
  );
  const [sourceSelection, setSourceSelection] = useState(
    addableSources.length > 0 ? addableSources[0].id : ""
  );
  useEffect(() => {
    if (addableSources.length > 0) setSourceSelection(addableSources[0].id);
    else setSourceSelection("");
  }, [addableSources]);

  const handleAddSource = () => {
    const srcToAdd = allSources.find(
      (src) => src.id === Number(sourceSelection)
    );
    if (srcToAdd) setSources([...sources, srcToAdd]);
  };
  const handleRemoveSource = (id) => {
    setSources(sources.filter((src) => src.id !== id));
  };

  return (
    <div>
      <h4>Sources</h4>
      <ul>
        {sources.map((src) => (
          <li key={src.id}>
            {src.name}
            <Button
              type="button"
              name="Delete"
              onClick={() => handleRemoveSource(src.id)}
            />
          </li>
        ))}
      </ul>
      {addableSources.length > 0 && (
        <>
          <select
            value={sourceSelection}
            onChange={(e) => setSourceSelection(e.target.value)}
          >
            {addableSources.map((src) => (
              <option key={src.id} value={src.id}>
                {src.name}
              </option>
            ))}
          </select>
          <Button type="button" name="Add Source" onClick={handleAddSource} />
        </>
      )}
    </div>
  );
};

export default NoteSourcesEditor;
