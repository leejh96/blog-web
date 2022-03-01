import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./components/views/LoginPage/Login";
import Signup from "./components/views/SignupPage/SignUp";
import Notice from "./pages/notice/Notice";
import Guestbook from "./pages/guestbook/Guestbook";
import Study from "./components/views/StudyPage/Study";
import StudyEdit from "./components/views/EditPage/Study/StudyEdit";
import NoticeEdit from "./components/views/EditPage/Notice/NoticeEdit";
import Detail from "./pages/notice/Detail";
import Auth from "./hoc/Auth"; //hoc higherOrderComponent
import Frame from "./hoc/Frame";
import FindPage from "./components/views/FindPage/FindPage";
import Newpassword from "./components/views/NewPasswordPage/Newpassword";
import Notfound from "./components/views/ErrorPage/NotfoundComponent";
import ServerError from "./components/views/ErrorPage/ServerErrorComponent";
import SettingMain from "./components/views/SettingPage/main/Main";
import SettingPassword from "./components/views/SettingPage/change/Password";
import SettingNick from "./components/views/SettingPage/change/Nick";
import SettingResign from "./components/views/SettingPage/change/Resign";
import ScrollToTop from "./util/ScrollToTop";
function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Auth(Frame(Main), null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/signup" component={Auth(Signup, false)} />
          {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
          <Route
            exact
            path="/notice/edit"
            component={Auth(Frame(NoticeEdit), true, true)}
          />
          <Route
            exact
            path="/notice/:id/edit"
            component={Auth(Frame(NoticeEdit), true, true)}
          />
          <Route
            exact
            path="/notice/:page"
            component={Auth(Frame(Notice), null)}
          />
          <Route
            exact
            path="/notice/detail/:postId"
            component={Auth(Frame(Detail), true)}
          />
          <Route
            exact
            path="/guestbook/:page"
            component={Auth(Frame(Guestbook), null)}
          />
          <Route
            exact
            path="/study/:study"
            component={Auth(Frame(Study), null)}
          />
          <Route
            exact
            path="/study/:study/edit"
            component={Auth(Frame(StudyEdit), true, true)}
          />
          <Route
            exact
            path="/setting"
            component={Auth(Frame(SettingMain), true)}
          />
          <Route
            exact
            path="/setting/password"
            component={Auth(Frame(SettingPassword), true)}
          />
          <Route
            exact
            path="/setting/nick"
            component={Auth(Frame(SettingNick), true)}
          />
          <Route
            exact
            path="/setting/resign"
            component={Auth(Frame(SettingResign), true)}
          />
          <Route exact path="/findPassword" component={Auth(FindPage, false)} />
          <Route
            exact
            path="/newPassword"
            component={Auth(Newpassword, false)}
          />
          <Route exact path="/error/500" component={ServerError} />
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
