import { Button, Card } from "flowbite-react";

const SetAdd = ({ handleAddSet }) => {
  const addSet = () => {
    handleAddSet();
  };
  return (
    <div>
      <Card className="cursor-pointer items-center h-full">
        <Button
          onClick={addSet}
          color="green"
          className="max-w-35 cursor-pointer "
        >
          Add Set
        </Button>
      </Card>
    </div>
  );
};

export default SetAdd;
