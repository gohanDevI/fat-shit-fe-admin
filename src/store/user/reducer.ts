// import { USER_PERMISSION } from "~/constants/Permission";
// import { UserProfile } from "./../../model/UserProfile";
import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actionTypes';

const initialState: any = {
  isLoading: false,
  users: null,
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: true,
        users: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        pending: true,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
