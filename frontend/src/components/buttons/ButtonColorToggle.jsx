import { Button } from "flowbite-react";
import { IoIosColorFill } from "react-icons/io";

const ButtonColorToggle = ({ onClick }) => {
  return (
    <Button
      onClick={() => onClick((prev) => !prev)}
      color="clear"
      size="xs"
      className="focus:ring-0"
    >
      <IoIosColorFill
        size="20"
        className="text-gray-500 transition-colors hover:text-blue-500"
      />
    </Button>
  );
};

export default ButtonColorToggle;
