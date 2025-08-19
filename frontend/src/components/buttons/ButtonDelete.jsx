import { Button } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";

const ButtonDelete = ({ onClick }) => {
  return (
    <Button
      size="xs"
      color="clear"
      className="group !p-1 bg-transparent hover:bg-transparent focus:ring-0 "
      onClick={onClick}
    >
      <MdDeleteForever
        size="25"
        className="text-gray-500 transition-colors hover:text-red-600"
      />
    </Button>
  );
};
export default ButtonDelete;
