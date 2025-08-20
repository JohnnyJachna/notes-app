import { useState, useEffect, useMemo } from "react";
import { sourcesAtom } from "../../sources/SourcesAtoms";
import { useAtomValue } from "jotai/react";

import NoteSource from "./NoteSource";
import ButtonAdd from "@/components/buttons/ButtonAdd";

import { Dropdown, DropdownItem, Popover } from "flowbite-react";

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
    if (addableSources.length > 0) setSourceSelection(addableSources[0]);
    else setSourceSelection("");
  }, [addableSources]);

  const handleAddSource = () => {
    const srcToAdd = allSources.find(
      (src) => src.id === Number(sourceSelection.id)
    );
    if (srcToAdd) setSources([...sources, srcToAdd]);
  };
  const handleRemoveSource = (id) => {
    setSources(sources.filter((src) => src.id !== id));
  };

  return (
    <div className="mt-2 mb-2 flex flex-row flex-wrap items-center">
      <h4 className="font-semibold text-lg mr-2">Sources:</h4>
      {addableSources?.length > 0 && (
        <>
          <ButtonAdd onClick={handleAddSource} />
          <Dropdown
            label={sourceSelection.name}
            size="sm"
            className="mr-2.5"
            style={{ height: 28 }}
          >
            {addableSources.map((source) => (
              <DropdownItem
                key={source.id}
                onClick={() => setSourceSelection(source)}
              >
                {source.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </>
      )}
      <ul className="flex gap-1 flex-wrap">
        {sources.map((source) => (
          <NoteSource
            key={source.id + source.name}
            source={source}
            handleRemove={handleRemoveSource}
          />
        ))}
      </ul>
    </div>
  );
};
export default NoteSourcesEditor;
