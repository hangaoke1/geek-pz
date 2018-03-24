import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import user from './user';
import { all } from 'redux-saga/effects';
// root reducer
const RootReducer = combineReducers({
  user: user.userReducer
});

// rootSaga
const rootSaga = function* () {
  yield all([user.userSaga()]);
};

// createSagaMiddleware
const sagaMiddleWare = createSagaMiddleware();
// store
const Store = createStore(RootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default Store;
