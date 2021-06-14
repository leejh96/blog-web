import React, {Suspense} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Main from './views/MainPage/Main';
import Login from './views/LoginPage/Login';
import Signup from './views/SignupPage/SignUp';
import Notice from './views/NoticePage/Notice';
import Diary from './views/DiaryPage/Diary';
import Guestbook  from './views/GuestbookPage/Guestbook';
import Study from './views/StudyPage/Study';
function App() {
  return (
    <>
      <Suspense fallback={(<div>로딩중 ...</div>)}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            {/* 쿼리스트링 값은 path에 적지 않고 쿼리스트링 전 path만 입력 */}
            <Route exact path='/notice' component={Notice} />
            <Route exact path='/diary' component={Diary} /> 
            <Route exact path='/guestbook' component={Guestbook} /> 
            <Route exact path='/:study' component={Study} /> 
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
