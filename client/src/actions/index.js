import axios from "axios";
import { FETCH_USER, FETCH_EVENTS } from "./types";

export const fetchUser = () => {
  const user = axios
    .get(`/api/current_user`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_USER,
    payload: user
  };
};

export const fetchEvents = () => {
  const events = axios
    .get(`/events/list`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_EVENTS,
    payload: events
  };
};
