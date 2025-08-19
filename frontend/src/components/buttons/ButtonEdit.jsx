import { Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

const ButtonEdit = ({ onClick }) => {
  return (
    <Button
      size="xs"
      color="clear"
      className="group !p-1 bg-transparent hover:bg-transparent focus:ring-0 "
      onClick={onClick}
    >
      <FaEdit
        size="20"
        className="text-gray-500 transition-colors hover:text-blue-500"
      />
    </Button>
  );
};
export default ButtonEdit;
