const NoteTag = ({ tag, handleRemove }) => {
  const removeItem = () => {
    handleRemove(tag.id);
  };
  return (
    <div
      id="chip"
      className="mt-2 mb-2 relative rounded-md flex bg-slate-800 py-0.5 pl-2.5 pr-8 border border-transparent text-sm text-white transition-all shadow-sm"
    >
      <p className="truncate max-w-20">{tag.name}</p>
      <button
        className="flex items-center justify-center transition-all p-1 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-0.5 right-0.5"
        type="button"
        onClick={removeItem}
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
