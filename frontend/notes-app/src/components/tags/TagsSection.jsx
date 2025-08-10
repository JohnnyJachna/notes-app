import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useAPI } from "../../utils/api";

import TagsList from "./TagsList";
import Button from "../Button";

const TagsSection = () => {
  const [tagsList, setTagsList] = useState([]);
  const { makeRequest } = useAPI();

  let params = useParams();
  const setID = params.setID;

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await makeRequest(`sets/${setID}/tags`);
      setTagsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTag = async () => {
    const body = {
      name: "New Tag",
      set_id: setID,
    };

    try {
      await makeRequest(`sets/${setID}/tags/add`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      fetchTags();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTag = async (id) => {
    try {
      await makeRequest(`sets/${setID}/tags/${id}`, {
        method: "DELETE",
        body: id,
      });
      fetchTags();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TagsList tagsList={tagsList} handleDeleteTag={deleteTag} />
      <Button type="button" name="Add Tag" onClick={addTag} />
    </>
  );
};

export default TagsSection;
