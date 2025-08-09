import { useState } from "react";
import { useEffect } from "react";
import { useAPI } from "../../utils/api";

import SetsList from "./SetsList";
import Button from "../Button";

const SetsSection = () => {
  const date = new Date().toLocaleString();

  const [setsList, setSetsList] = useState([]);
  const { makeRequest } = useAPI();

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    try {
      const data = await makeRequest("sets");
      setSetsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    const body = {
      name: "New Set",
      create_date: date,
      update_date: date,
    };

    try {
      const response = await makeRequest("sets/add", {
        method: "POST",
        body: JSON.stringify(body),
      });
      fetchSets();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSet = async (id) => {
    try {
      const response = await makeRequest(`sets/${id}`, {
        method: "DELETE",
        body: id,
      });
      fetchSets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SetsList setsList={setsList} handleDeleteSet={deleteSet} />
      <Button type="button" name="Add Set" onClick={addSet} />
    </>
  );
};

export default SetsSection;
