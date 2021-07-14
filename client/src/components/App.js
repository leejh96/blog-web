import React, {Suspense} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Main from './views/MainPage/Main';
import Login from './views/LoginPage/Login';
import Signup from './views/SignupPage/SignUp';
import Notice from './views/NoticePage/Notice';
import Diary from './views/DiaryPage/Diary';
import Guestbook  from './views/GuestbookPage/Guestbook';
import Study from './views/StudyPage/Study';
import StudyEdit from './views/EditPage/Study/StudyEdit';
import NoticeEdit from './views/EditPage/Notice/NoticeEdit';
import NoticeDetail from './views/DetailPage/Detail';
import Auth from '../hoc/Auth'; //hoc higherOrderComponent
function App() {
  return (
    <>
      <Suspense fallback={(<div>로딩중 ...</div>)}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Auth(Main, null)} />
            <Route exact path='/login' component={Auth(Login, false)} />
            <Route exact path='/signup' component={Auth(Signup, false)} />
            {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
            <Route exact path='/notice/edit' component={Auth(NoticeEdit, true, true)} />
            <Route exact path='/notice/:id/edit' component={Auth(NoticeEdit, true, true)} />
            <Route exact path='/notice/:page' component={Notice} />
            <Route exact path='/notice/:page/:id' component={Auth(NoticeDetail, true, true)} />
            <Route exact path='/diary' component={Diary} /> 
            <Route exact path='/guestbook/:id' component={Guestbook} /> 
            <Route exact path='/study/:study' component={Study} />
            <Route exact path='/study/:study/edit' component={Auth(StudyEdit, true, true)} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
