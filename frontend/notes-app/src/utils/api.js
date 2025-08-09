export const useAPI = () => {
  const makeRequest = async (endpoint, options = {}) => {
    const defaultOptions = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${endpoint}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.json();
  };
  return { makeRequest };
};
