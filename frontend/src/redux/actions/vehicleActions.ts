import { makeAPIRequest } from "@/lib/apiService";
import { IS_LOADING, SET_ERROR, SET_VEHICLES } from "../actionTypes";
import { api, GET } from "@/lib/apiConstants";
import { AppDispatch } from "../store";

export const getVehicles = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: GET,
      url: api.vehicles,
    
    });

    if (response.success) {
        
      dispatch({ type: SET_VEHICLES, payload: response?.data });
      return response?.data;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Login failed";
    dispatch({ type: SET_ERROR, payload: errorMessage });
    return false;
  } finally {
    dispatch({ type: IS_LOADING, payload: false });
  }
};