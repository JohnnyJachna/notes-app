import { Link } from "react-router";

import SetList from "../components/sets/SetsList";

const SetsPage = () => {
  return (
    <>
      <h3>Sets Page</h3>
      <SetList />
      <Link to="/sets/editor">Editor</Link>
    </>
  );
};

export default SetsPage;
