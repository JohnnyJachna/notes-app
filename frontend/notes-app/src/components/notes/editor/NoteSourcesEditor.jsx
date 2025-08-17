import { useState, useEffect, useMemo } from "react";
import { sourcesAtom } from "../../sources/SourcesAtoms";
import { useAtomValue } from "jotai/react";

import { Badge, Button, Dropdown, DropdownItem } from "flowbite-react";

const NoteSourcesEditor = ({ sources, setSources }) => {
  const allSources = useAtomValue(sourcesAtom);

  const addableSources = useMemo(
    () =>
      allSources.filter(
        (src) => !sources.some((noteSrc) => noteSrc.id === src.id),
      ),
    [allSources, sources],
  );
  const [sourceSelection, setSourceSelection] = useState(
    addableSources.length > 0 ? addableSources[0].id : "",
  );
  useEffect(() => {
    if (addableSources.length > 0) setSourceSelection(addableSources[0]);
    else setSourceSelection("");
  }, [addableSources]);

  const handleAddSource = () => {
    const srcToAdd = allSources.find(
      (src) => src.id === Number(sourceSelection.id),
    );
    if (srcToAdd) setSources([...sources, srcToAdd]);
  };
  const handleRemoveSource = (id) => {
    setSources(sources.filter((src) => src.id !== id));
  };

  return (
    <div>
      <h4>Sources</h4>
      <ul className="flex flex-row flex-wrap gap-2">
        {sources.map((source) => (
          <>
            <Badge key={source.id + source.name} size="sm" color="yellow">
              {source.name}
            </Badge>
            <Button
              onClick={() => handleRemoveSource(source.id)}
              size="xs"
              color="alternative"
            >
              x
            </Button>
          </>
        ))}
      </ul>
      {addableSources.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button onClick={handleAddSource}>Add Source</Button>
          <Dropdown label={sourceSelection.name}>
            {addableSources.map((source) => (
              <DropdownItem
                key={source.id}
                onClick={() => setSourceSelection(source)}
              >
                {source.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      )}
    </div>
  );
};
export default NoteSourcesEditor;
