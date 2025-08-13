import { Outlet } from "react-router";
import { SetsProvider } from "../context/SetsContext";

const SetContextLayout = () => {
  return (
    <SetsProvider>
      <Outlet />
    </SetsProvider>
  );
};

export default SetContextLayout;
