import React, {Suspense} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Main from './views/MainPage/Main';
import Login from './views/LoginPage/Login';
import Signup from './views/SignupPage/SignUp';
import Notice from './views/NoticePage/Notice';
import Guestbook  from './views/GuestbookPage/Guestbook';
import Study from './views/StudyPage/Study';
import StudyEdit from './views/EditPage/Study/StudyEdit';
import NoticeEdit from './views/EditPage/Notice/NoticeEdit';
import Detail from './views/DetailPage/Detail';
import Auth from '../hoc/Auth'; //hoc higherOrderComponent
import Setting from './views/SettingPage/Setting';
import Issue from './views/IssuePage/Issue';
import Frame from '../hoc/Frame';


function App() {
  return (
    <>
      <Suspense>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Auth(Frame(Main), null)} />
            <Route exact path='/login' component={Auth(Login, false)} />
            <Route exact path='/signup' component={Auth(Signup, false)} />
            {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
            <Route exact path='/notice/edit' component={Auth(Frame(NoticeEdit), true, true)} />
            <Route exact path='/notice/:id/edit' component={Auth(Frame(NoticeEdit), true, true)} />
            <Route exact path='/notice/:page' component={Frame(Notice)} />
            <Route exact path='/notice/:page/:id' component={Auth(Frame(Detail), true)} />
            <Route exact path='/diary/:study' component={Frame(Detail)} />
            <Route exact path='/guestbook/:id' component={Frame(Guestbook)} /> 
            <Route exact path='/study/:study' component={Frame(Study)} />
            <Route exact path='/study/:study/edit' component={Auth(Frame(StudyEdit), true, true)} />
            <Route exact path='/setting' component={Auth(Frame(Setting), true)} />
            <Route exact path='/setting/:change' component={Auth(Frame(Setting), true)} />
            <Route exact path='/issue' component={Frame(Issue)} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;