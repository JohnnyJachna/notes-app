import Set from "./Set";

const SetsList = ({ setsList, handleDeleteSet }) => {
  return (
    <>
      <h4>Sets List</h4>
      {setsList.map((set) => (
        <Set id={set.id} key={set.id} handleDeleteSet={handleDeleteSet} />
      ))}
    </>
  );
};

export default SetsList;
