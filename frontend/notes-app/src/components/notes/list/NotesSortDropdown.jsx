const NotesSortDropdown = ({ types, sortType, setSortType }) => (
  <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
    {types.map((str, index) => (
      <option key={index} value={str}>
        {str}
      </option>
    ))}
  </select>
);

export default NotesSortDropdown;
