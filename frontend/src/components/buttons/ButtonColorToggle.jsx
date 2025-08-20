import { Button } from "flowbite-react";
import { IoIosColorFill } from "react-icons/io";

const ButtonColorToggle = ({ onClick }) => {
  return (
    <Button
      onClick={() => onClick((prev) => !prev)}
      color="clear"
      size="xs"
      className="focus:ring-0 cursor-pointer"
    >
      <IoIosColorFill
        size="20"
        className="text-gray-500 transition-colors hover:text-gray-300"
      />
    </Button>
  );
};

export default ButtonColorToggle;
