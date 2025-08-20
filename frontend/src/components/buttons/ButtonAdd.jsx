import { Button } from "flowbite-react";
import { IoMdAddCircleOutline } from "react-icons/io";

const ButtonAdd = ({ onClick }) => {
  return (
    <Button onClick={onClick} size="xs" color="clear" className="focus:ring-0">
      <IoMdAddCircleOutline
        size="20"
        className="text-gray-200 transition-colors hover:text-blue-500"
      />
    </Button>
  );
};

export default ButtonAdd;
