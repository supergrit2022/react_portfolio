import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { BrowserRouter } from '../node_modules/react-router-dom/index';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from '../node_modules/react-redux/es/exports';
import { Provider } from 'react-redux';
// import { createStore } from '../node_modules/redux/index';
import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import rootReducer from './modules/index';
import rootReducer, {rootSaga} from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return; // 로그인 상태가 아니라면 아무것도 안한다.

    //store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch(e) {
    console.log('localStorage is not working');
  }
}



sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
