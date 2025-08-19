import { Badge } from "flowbite-react";

const NoteSourcesPreview = ({ sources }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs">
      <span className="font-medium">Sources:</span>
      {sources && sources.length > 0 ? (
        <ul className="flex flex-wrap gap-1">
          {sources.map((source) => {
            return (
              <Badge
                key={source.id}
                color={source.color}
                className="whitespace-nowrap"
              >
                <p>{source.name}</p>
              </Badge>
            );
          })}
        </ul>
      ) : (
        <span className="text-gray-500">None</span>
      )}
    </div>
  );
};

export default NoteSourcesPreview;
