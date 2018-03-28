import axios from "axios";
import keys from "../config/keys";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  const user = axios
    .get(`/api/current_user`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_USER,
    payload: user
  };
};
