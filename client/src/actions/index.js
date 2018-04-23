import axios from "axios";
import {
  FETCH_USER,
  FETCH_EVENTS,
  FETCH_EVENT,
  SUBMIT_EVENT,
  FETCH_INVITATIONS,
  FETCH_GUESTS,
  FETCH_USERS
} from "./types";

export const fetchUser = () => {
  const user = axios
    .get(`/auth/current_user`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_USER,
    payload: user
  };
};

export const fetchUsers = () => {
  const users = axios
    .get(`/api/users/list`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_USERS,
    payload: users
  };
};

export const fetchEvent = eventId => {
  const event = axios
    .get(`/api/events/details?eventId=${eventId}`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_EVENT,
    payload: event
  };
};

export const fetchGuests = eventId => {
  const guests = axios
    .get(`/api/events/guests?eventId=${eventId}`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_GUESTS,
    payload: guests
  };
};

export const fetchEvents = () => {
  const events = axios
    .get(`/api/events/list`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export const createEvent = (event, history) => {
  const res = axios.post(`/api/events/create`, event, {
    withCredentials: true
  });

  return {
    type: SUBMIT_EVENT,
    payload: res.data
  };
};

export const inviteGuests = (eventId, guestIdList) => {
  const requestBody = {};
  requestBody.eventId = eventId;
  requestBody.invitations = guestIdList.map(guestId => ({
    invitedId: guestId
  }));

  const guests = axios
    .post(`/api/invitations/invite`, requestBody, {
      withCredentials: true
    })
    .then(response => response.data);

  return {
    type: FETCH_GUESTS,
    payload: guests
  };
};

export const removeInvitation = invitationId => {
  const requestBody = {};
  requestBody.invitationId = invitationId;

  const guests = axios
    .post(`/api/invitations/cancel`, requestBody, {
      withCredentials: true
    })
    .then(response => response.data);

  return {
    type: FETCH_GUESTS,
    payload: guests
  };
};

export const fetchInvitations = () => {
  const invitations = axios
    .get(`/api/invitations/list`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: FETCH_INVITATIONS,
    payload: invitations
  };
};
