import Axios from "../util/Axios";
import {
  AUTH_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  UPDATE_PASSWORD,
  DELETE_USER,
} from "./type";

export const registerUser = async (data) => {
  try {
    const res = await Axios.post("/api/user", data);
    if (res.status === 201) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const loginUser = async (email, password) => {
  try {
    const data = { email, password };
    const res = await Axios.post("/api/user/login", data);
    if (res.status === 200) {
      Axios.defaults.headers.Authorization = res.data.accessToken;
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await Axios.post("/api/user/logout");
    if (res.status === 200) {
      Axios.defaults.headers.Authorization = null;
      return dispatch({
        type: LOGOUT_USER,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const logoutOauth = () => async (dispatch) => {
  try {
    const res = await Axios.post("/api/user/logout");
    if (res.status === 200) {
      return dispatch({
        type: LOGOUT_USER,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const authUser = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/user");
    if (res.status === 200) {
      return dispatch({
        type: AUTH_USER,
        data: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    return error.response;
  }
};

export const changeNick = async (nick) => {
  try {
    const res = await Axios.put(`/api/user/nick`, { nick });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const changePassword = (password) => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/user/password`, { password });
    if (res.status === 200) {
      return dispatch({
        type: UPDATE_PASSWORD,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const resignUser = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/user?id=${id}`);
    if (res.status === 200) {
      return dispatch({
        type: DELETE_USER,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const resignOAuthUser = () => async (dispatch) => {
  try {
    const res = await Axios.delete("/api/user/oauth");
    if (res.status === 200) {
      return dispatch({
        type: DELETE_USER,
        data: res.data,
      });
    }
  } catch (error) {
    return error.response;
  }
};

export const uploadImage = async (file) => {
  try {
    const res = await Axios.post("/api/user/img", file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteImage = async (img) => {
  try {
    const res = await Axios.delete("/api/user/img", { img });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const updateMotto = async (text) => {
  try {
    const res = await Axios.put("/api/user/motto", { text });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const findUser = async (name, email) => {
  try {
    const res = await Axios.get(
      `/api/user/find?email=${email}&username=${name}`
    );
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

export const newPassword = async (password, id) => {
  try {
    const res = await Axios.post("/api/user/password", { password, id });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};
