import Axios from "../util/Axios";
import {
  LOAD_NOTICE,
  LOAD_ONE_NOTICE,
  CREATE_NOTICE,
  ADD_LIKE,
  DELETE_LIKE,
  CREATE_NOTICE_COMMENT,
  DELETE_NOTICE_COMMENT,
  DELETE_NOTICE,
  SEARCH_NOTICE,
  COUNT_NOTICE,
} from "./type";

//camelCase
export const loadNotice = (page) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/notice/${page}`);
    if (res.status === 200) {
      return dispatch({
        type: LOAD_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const loadMainNotice = () => async () => {
  try {
    const res = await Axios.get("/api/notice/main");
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const countNotice = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/notice/count");
    if (res.status === 200) {
      return dispatch({
        type: COUNT_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const loadOneNotice = (postId) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/notice/detail/${postId}`);
    if (res.status === 200) {
      return dispatch({
        type: LOAD_ONE_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const createNotice = (data) => async (dispatch) => {
  try {
    const res = await Axios.post("/api/notice", data);
    if (res.status === 201) {
      return dispatch({
        type: CREATE_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const updateNotice = async (data) => {
  try {
    const res = await Axios.put(`/api/notice/${data.postId}`, data);
    if (res.status === 200) {
      return {
        data: res.data,
      };
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteNotice = (postId) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/notice/${postId}`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};
export const searchNotice = (input) => async (dispatch) => {
  const { text, type } = input;
  try {
    const res = await Axios.get(`/api/notice/search?text=${text}&type=${type}`);
    if (res.status === 200) {
      return dispatch({
        type: SEARCH_NOTICE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};
export const createNoticeComment = (data) => async (dispatch) => {
  try {
    const res = await Axios.post(`/api/notice/comment`, data);
    if (res.status === 201) {
      return dispatch({
        type: CREATE_NOTICE_COMMENT,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await Axios.post(`/api/notice/${postId}/like`);
    if (res.status === 200) {
      return dispatch({
        type: ADD_LIKE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteLike = (postId) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/notice/${postId}/like`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_LIKE,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteNoticeComment = (commentId, postId) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/notice/${postId}/${commentId}`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_NOTICE_COMMENT,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};
