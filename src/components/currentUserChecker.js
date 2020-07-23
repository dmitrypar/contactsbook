import { useEffect, useContext } from "react";
import useFetch from "./../hooks/useFetch";
import { CurrentUserContext } from "./../context/currentUser";
import useLocalStorage from "./../hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch("/auth/user");
  const [, setcurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      setcurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch();
    setcurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [setcurrentUserState, token, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setcurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response,
    }));
  }, [response, setcurrentUserState]);

  return children;
};

export default CurrentUserChecker;
