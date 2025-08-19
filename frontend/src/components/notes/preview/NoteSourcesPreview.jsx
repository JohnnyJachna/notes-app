import { Badge } from "flowbite-react";

const NoteSourcesPreview = ({ sources }) => {
  return (
    <div className="flex flex-wrap gap-2 align-baseline items-center">
      <p>Sources:</p>
      {sources && sources.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {sources.map((source) => {
            return (
              <Badge key={source.id} color={source.color}>
                <p>{source.name}</p>
              </Badge>
            );
          })}
        </ul>
      ) : (
        <p>Click edit to add a source</p>
      )}
    </div>
  );
};

export default NoteSourcesPreview;
