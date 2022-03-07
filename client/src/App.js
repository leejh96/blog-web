import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Notice from "./pages/notice/Notice";
import Guestbook from "./pages/guestbook/Guestbook";
import Study from "./pages/study/Study";
import StudyEdit from "./pages/study/StudyEdit";
import Edit from "./pages/notice/Edit";
import Detail from "./pages/notice/Detail";
import Auth from "./hoc/Auth"; // hoc higherOrderComponent
import Frame from "./hoc/Frame";
import Find from "./components/FindComponent/FindPage";
import Newpassword from "./components/NewPasswordComponent/Newpassword";
import Notfound from "./components/ErrorComponent/NotfoundComponent";
import ServerError from "./components/ErrorComponent/ServerErrorComponent";
import SettingMain from "./components/SettingComponent/main/Main";
import SettingPassword from "./components/SettingComponent/change/Password";
import SettingNick from "./components/SettingComponent/change/Nick";
import SettingResign from "./components/SettingComponent/change/Resign";
import ScrollToTop from "./util/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Auth(Frame(Main), null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/signup" component={Auth(Register, false)} />
        {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
        <Route
          exact
          path="/notice/edit"
          component={Auth(Frame(Edit), true, true)}
        />
        <Route
          exact
          path="/notice/:postId/edit"
          component={Auth(Frame(Edit), true, true)}
        />
        <Route
          exact
          path="/notice/:Component"
          component={Auth(Frame(Notice), null)}
        />
        <Route
          exact
          path="/notice/detail/:postId"
          component={Auth(Frame(Detail), true)}
        />
        <Route
          exact
          path="/guestbook/:Component"
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
        <Route exact path="/findPassword" component={Auth(Find, false)} />
        <Route exact path="/newPassword" component={Auth(Newpassword, false)} />
        <Route exact path="/error/500" component={ServerError} />
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
