import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/Auth";
import Edit from "../pages/notice/Edit";
import Main from "../pages/main/Main";
import Notice from "../pages/notice/Notice";
import Guestbook from "../pages/guestbook/Guestbook";
import Detail from "../pages/notice/Detail";
import Study from "../pages/study/Study";
import StudyEdit from "../pages/study/StudyEdit";
import MyPage from "../pages/mypage/MyPage";
import Change from "../pages/mypage/Change";

function FrameRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Auth(Main, null)} />
      {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
      <Route exact path="/notice/edit" component={Auth(Edit, true, true)} />
      <Route
        exact
        path="/notice/:postId/edit"
        component={Auth(Edit, true, true)}
      />
      <Route exact path="/notice/:page" component={Auth(Notice, null)} />
      <Route
        exact
        path="/notice/detail/:postId"
        component={Auth(Detail, true)}
      />
      <Route exact path="/guestbook/:page" component={Auth(Guestbook, null)} />
      <Route exact path="/study/:study" component={Auth(Study, null)} />
      <Route
        exact
        path="/study/:study/edit"
        component={Auth(StudyEdit, true, true)}
      />
      <Route exact path="/mypage" component={Auth(MyPage, true)} />
      <Route exact path="/mypage/:change" component={Auth(Change, true)} />
    </Switch>
  );
}

export default memo(FrameRoutes);
