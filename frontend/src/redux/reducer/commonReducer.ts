import { IS_LOADING, SET_ERROR, SET_VEHICLES, USER_LOGIN } from "../actionTypes";


// Intital State for data
const initialState = {
  isLoading: false,
  error: null,
  userData: null,
  setVehiclesData: null,
};

// Action will be called here and data will be set accordingly
const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    case SET_VEHICLES:
      return { ...state, setVehiclesData: action.payload };
    default:
      return state;
  }
};

export default commonReducer;