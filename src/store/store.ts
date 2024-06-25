import { createStore, applyMiddleware } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store: any = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const { dispatch } = store;
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export { store, dispatch, useSelector };
