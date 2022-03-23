import Axios from "../util/Axios";
import {
  CREATE_GUESTBOOK,
  DELETE_GUESTBOOK,
  LOAD_GUESTBOOK,
  COUNT_GUESTBOOK,
} from "./type";
//camelCase
export const createGuestBook = (data) => async (dispatch) => {
  try {
    const res = await Axios.post("/api/guestbook", data);
    if (res.status === 201) {
      return dispatch({
        type: CREATE_GUESTBOOK,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteGuestBook = (guestbookId) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/guestbook?id=${guestbookId}`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_GUESTBOOK,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const loadGuestBook = (page) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/guestbook/${page}`);
    if (res.status === 200) {
      return dispatch({
        type: LOAD_GUESTBOOK,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const countGuestBook = () => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/guestbook`);
    if (res.status === 200) {
      return dispatch({
        type: COUNT_GUESTBOOK,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};
