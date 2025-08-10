import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useAPI } from "../../utils/api";

import SourcesList from "./SourcesList";
import Button from "../Button";

const SourcesSection = () => {
  const [sourcesList, setSourcesList] = useState([]);
  const { makeRequest } = useAPI();

  let params = useParams();
  const setID = params.setID;

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const data = await makeRequest(`sets/${setID}/sources`);
      setSourcesList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSource = async () => {
    const body = {
      title: "New Source",
      set_id: setID,
    };

    try {
      await makeRequest(`sets/${setID}/sources/add`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      fetchSources();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSource = async (id) => {
    try {
      await makeRequest(`sets/${setID}/sources/${id}`, {
        method: "DELETE",
        body: id,
      });
      fetchSources();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SourcesList
        sourcesList={sourcesList}
        handleDeleteSource={deleteSource}
      />
      <Button type="button" name="Add Source" onClick={addSource} />
    </>
  );
};

export default SourcesSection;
