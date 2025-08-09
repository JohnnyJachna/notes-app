import Set from "./Set";

const SetsList = ({ setsList, handleDeleteSet }) => {
  return (
    <>
      <h4>Sets List</h4>
      {setsList.map((set) => (
        <Set
          id={set.id}
          key={set.id}
          name={set.name}
          create_date={set.create_date}
          update_date={set.update_date}
          handleDeleteSet={handleDeleteSet}
        />
      ))}
    </>
  );
};

export default SetsList;
