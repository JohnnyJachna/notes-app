import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

import { Button, Popover } from "flowbite-react";

const NoteSource = ({ source, handleRemove }) => {
  const bgColor = validHex(source.color) ? source.color : "#F8E61B";
  const txtColor = getContrastingColor(bgColor);

  const removeItem = () => {
    handleRemove(source.id);
  };

  return (
    <>
      <Popover
        aria-labelledby="default-popover"
        content={
          <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
              <h3
                id="default-popover"
                className="font-semibold text-gray-900 dark:text-white"
              >
                {source.name}
              </h3>
            </div>
            <div className="px-3 py-2">
              {source.title && <p>Title: {source.title}</p>}
              {source.authors && <p>Author(s): {source.authors}</p>}
              {source.publishers && <p>Publisher(s): {source.publishers}</p>}
              {source.pages && <p>Page(s): {source.pages}</p>}
              {source.publish_date && (
                <p>Date published: {source.publish_date}</p>
              )}
              {source.update_date && <p>Date updated: {source.update_date}</p>}
              {source.access_date && <p>Date accessed: {source.access_date}</p>}
            </div>
          </div>
        }
      >
        <div
          className="mt-2 mb-2 relative rounded-md flex py-0.5 pl-2.5 pr-8 border border-transparent text-sm transition-all shadow-sm"
          style={{ backgroundColor: bgColor, color: txtColor }}
        >
          <p className="truncate max-w-20">{source.name}</p>
          <button
            type="button"
            onClick={removeItem}
            className="flex items-center justify-center transition-all p-1 rounded-md absolute top-0.5 right-0.5 hover:bg-white/10 active:bg-white/20"
            style={{ color: txtColor }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
          </button>
        </div>
      </Popover>
    </>
  );
};

export default NoteSource;
