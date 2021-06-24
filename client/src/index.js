import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


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
