import type { AnyAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer, { AuthState } from '../features/auth/authSlice';
import vehiclesReducer, { VehiclesState } from '../features/vehicles/vehiclesSlice';

interface RootState {
  auth: AuthState;
  vehicles: VehiclesState;
}

const combinedReducer = combineReducers({
  auth: authReducer,
  vehicles: vehiclesReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  // TODO:
  //cleaning the store after the logout
  /* if (action.type === 'auth/logoutUser') {
    state = undefined;
  } */

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// enable listener behavior for the store
setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
