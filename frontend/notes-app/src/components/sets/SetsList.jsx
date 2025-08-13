import Set from "./Set";
import { setsAtom } from "./SetsAtoms";
import { useAtom } from "jotai/react";

const SetsList = () => {
  const [list] = useAtom(setsAtom);
  return (
    <>
      <h4>Sets List</h4>
      {list.map((set) => (
        <Set
          id={set.id}
          key={set.id}
          name={set.name}
          create_date={set.create_date}
          update_date={set.update_date}
        />
      ))}
    </>
  );
};

export default SetsList;
