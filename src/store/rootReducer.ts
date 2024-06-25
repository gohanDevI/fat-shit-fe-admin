import userReducer from './user/reducer';

const rootReducer = userReducer;

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
