import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
// import { CssBaseline } from '@material-ui/core'; // material-ui에서 기본 css를 제공함 배경도 포함

//redux-devtools와 middleware를 같이 사용하기 위해서 사용
import { composeWithDevTools } from 'redux-devtools-extension';

// 리덕스 관련 정보들을 기록하는 미들웨어로 store 생성시 넣어줌
// import logger from 'redux-logger';
// 리덕스가 비동기처리를 할 수 있도록 해주는 미들웨어
import ReduxThunk from 'redux-thunk';

//applyMiddleware()는 스토어에 미들웨어를 적용하려할 때 사용
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk),
  )
);

// subscribe는 state가 변경될때마다 실행(콜백함수 실행)
// state가 변경될 때마다 console 기록
// subscribe의 반환값이 unsubscribe 함수이므로
// 나중에 unsubscribe를 실행시키면 subscribe 실행 x

// const unsubscribe = store.subscribe(() => console.log(store.getState()));
// unsubscribe(); // subscribe 실행 x

ReactDOM.render(
  <React.StrictMode>
    {/* <App store={store}/> 이런식으로 props로 줘도 되지만
    너무 복잡해지기 때문에 react-redux 사용 */}

    {/* Provider로 감싸고 store를 인수로 주는 방법이 react-redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
