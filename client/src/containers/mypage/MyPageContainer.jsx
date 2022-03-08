import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../actions/UserAction";
import MyPageComponent from "../../components/MyPageComponent/MyPageComponent";
import { deleteImg } from "../../actions/UserAction";
import {
  AUTH_ERROR,
  SERVER_ERROR,
  UPDATE_IMAGE,
  UPDATE_IMAGE_ERROR,
} from "../../actions/type";
import { useHistory } from "react-router-dom";

function MyPageContainer() {
  const [path, setPath] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setPath(user.img);
  }, [user]);
  const onChangeImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(uploadImage(formData)).then((res) => {
      if (res.type === UPDATE_IMAGE) {
        return setPath(res.data.file);
      }
      if (res.type === UPDATE_IMAGE_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === AUTH_ERROR) {
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  };

  const onClickDeleteImage = () => {
    if (
      user.img ===
      "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png"
    ) {
      return;
    }
    dispatch(deleteImg(user.img)).then((res) => {
      if (res.data.success) {
        return setPath(res.data.img);
      }
      return alert(res.data.message);
    });
  };
  return (
    <MyPageComponent
      onChangeImage={onChangeImage}
      onClickDeleteImage={onClickDeleteImage}
      path={path}
      user={user}
    />
  );
}

export default MyPageContainer;
