const ItemOverlay = ({ children }) => (
  <div className="cursor-grabbing touch-none rounded border bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-700">
    <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400">⋮</span>
      <span className="dark:text-gray-200">{children}</span>
    </div>
  </div>
);

export default ItemOverlay;
