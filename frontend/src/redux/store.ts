import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from './actionTypes';
import commonReducer from './reducer/commonReducer';

const reducers = combineReducers({
  common: commonReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;