import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

const NoteTag = ({ tag, handleRemove }) => {
  const bgColor = validHex(tag.color) ? tag.color : "#F8E61B";
  const txtColor = getContrastingColor(bgColor);
  const removeItem = () => {
    handleRemove(tag.id);
  };

  return (
    <div
      className="inline-flex items-center gap-2 rounded-md h-7 px-2 pr-1 border border-transparent text-sm shadow-sm"
      style={{ backgroundColor: bgColor, color: txtColor }}
    >
      <p className="truncate max-w-24 leading-normal">{tag.name}</p>
      <button
        type="button"
        onClick={removeItem}
        className="flex items-center justify-center rounded hover:bg-white/10 active:bg-white/20 w-5 h-5 cursor-pointer"
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
  );
};

export default NoteTag;
