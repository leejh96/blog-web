import axios from "axios";
import {
  CREATE_GUESTBOOK,
  DELETE_GUESTBOOK,
  LOAD_GUESTBOOK,
  CREATE_GUESTBOOK_ERROR,
  AUTH_ERROR,
  SERVER_ERROR,
  DELETE_GUESTBOOK_ERROR,
  LOAD_GUESTBOOK_ERROR,
} from "./type";
//camelCase
export const createGuestBook = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/guestbook", data);
    //dispatch를 한번더 사용하지 않는다면 reducer의 initialState 값이 변하지 않는다.
    if (res.data.auth && res.data.success) {
      return dispatch({
        type: CREATE_GUESTBOOK,
        data: res.data.createContent,
      });
    }
    if (res.data.auth && !res.data.success) {
      return dispatch({
        type: CREATE_GUESTBOOK_ERROR,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const deleteGuestBook = (data) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/guestbook", data);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: DELETE_GUESTBOOK,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth) {
      return dispatch({
        type: DELETE_GUESTBOOK_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && !res.data.auth) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const loadGuestBook = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/guestbook/${page}`);
    if (res.data.success) {
      return dispatch({
        type: LOAD_GUESTBOOK,
        data: res.data.guests,
      });
    }
    return dispatch({
      type: LOAD_GUESTBOOK_ERROR,
      data: res.data,
    });
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
