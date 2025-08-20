import { Button } from "flowbite-react";
import { IoMdAddCircleOutline } from "react-icons/io";

const ButtonAdd = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="xs"
      color="clear"
      className="focus:ring-0 cursor-pointer"
    >
      <IoMdAddCircleOutline
        size="20"
        className="text-gray-300 transition-colors hover:text-white"
      />
    </Button>
  );
};

export default ButtonAdd;
