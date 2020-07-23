import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default (url) => {
  const baseUrl = "http://localhost:3000";
  const [isLoading, setloading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((option = {}) => {
    setOptions(option);
    setloading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      },
    };

    if (!isLoading) {
      return;
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        setloading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        setloading(false);
        setError(error.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};
