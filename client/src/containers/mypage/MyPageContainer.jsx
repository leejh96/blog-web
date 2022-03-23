import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  uploadImage,
  deleteImage,
  updateMotto,
} from "../../actions/UserAction";
import MyPageComponent from "../../components/MyPageComponent/MyPageComponent";
import { useHistory } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function MyPageContainer() {
  const { user } = useSelector((state) => state.UserReducer);
  const history = useHistory();
  const [path, setPath] = useState("");
  const [motto, setMotto] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setPath(user.img);
    setMotto(user.motto);
    return () => {
      setPath("");
      setMotto("");
      setIsLoading(false);
    };
  }, [user.img, user.motto]);

  const onChangeImage = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await uploadImage(formData);
    if (res.data.success) {
      setPath(res.data.file);
      return setIsLoading(false);
    }
    return history.push({
      pathname: "/error",
      state: {
        status: res.status,
        message: res.data.message,
        text: res.statusText,
      },
    });
  };

  const onClickDeleteImage = async () => {
    if (
      user.img ===
      "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png"
    ) {
      return;
    }
    setIsLoading(true);
    const res = await deleteImage(user.img);
    if (res.data.success) {
      setPath(res.data.img);
      return setIsLoading(false);
    }
    return history.push({
      pathname: "/error",
      state: {
        status: res.status,
        message: res.data.message,
        text: res.statusText,
      },
    });
  };

  const onChangeMotto = (e) => {
    setMotto(e.target.value);
  };

  const onSubmitMotto = async (e) => {
    e.preventDefault();
    if (!toggle) {
      return setToggle(true);
    }
    const res = await updateMotto(motto);
    if (res.data.success) {
      setMotto(res.data.motto);
      return setToggle(false);
    }
    return history.push({
      pathname: "/error",
      state: {
        status: res.status,
        message: res.data.message,
        text: res.statusText,
      },
    });
  };
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <MyPageComponent
      onChangeImage={onChangeImage}
      onClickDeleteImage={onClickDeleteImage}
      path={path}
      motto={motto}
      user={user}
      onChangeMotto={onChangeMotto}
      onSubmitMotto={onSubmitMotto}
      toggle={toggle}
    />
  );
}

export default MyPageContainer;
