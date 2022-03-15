import axios from "axios";
import {
  CREATE_STUDY,
  LOAD_STUDY,
  DELETE_STUDY,
  LOAD_ONE_STUDY,
  CREATE_STUDY_COMMENT,
  DELETE_STUDY_COMMENT,
} from "./type";
//camelCase
export const createStudy = (text) => async (dispatch) => {
  try {
    const data = { text };
    const res = await axios.post("/api/study", data);
    if (res.status === 201) {
      return dispatch({
        type: CREATE_STUDY,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const loadStudy = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/study");
    if (res.status === 200) {
      return dispatch({
        type: LOAD_STUDY,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const loadMainStudy = () => async () => {
  try {
    const res = await axios.get("/api/study/main");
    if (res.data.success) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const loadOneStudy = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/study/${page}`);
    if (res.status === 200) {
      return dispatch({
        type: LOAD_ONE_STUDY,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const updateStudy = async (page, text) => {
  try {
    const data = { text };
    const res = await axios.put(`/api/study/${page}`, data);
    if (res.status === 200) {
      return {
        data: res.data,
      };
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteStudy = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/study?id=${id}`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_STUDY,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const createStudyComment = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/study/${data.page}/comment`, {
      comment: data.text,
      date: data.date,
    });
    if (res.status === 201) {
      return dispatch({
        type: CREATE_STUDY_COMMENT,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteStudyComment = (commentId, page) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/study/${page}/comment?commentId=${commentId}`
    );
    if (res.status === 200) {
      return dispatch({
        type: DELETE_STUDY_COMMENT,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};
