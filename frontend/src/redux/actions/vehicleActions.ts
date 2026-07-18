import { makeAPIRequest } from "@/lib/apiService";
import { IS_LOADING, SET_ERROR, SET_VEHICLES } from "../actionTypes";
import { api, GET, POST } from "@/lib/apiConstants";
import { AppDispatch } from "../store";

export const getVehicles = (params?: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: GET,
      url: api.vehicles,
      params: params
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




export const addVehicleAction = (vehicleData?: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: POST,
      url: `${api.vehicles}`,
      data:
        vehicleData
      
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
export const purchaseVehicle = (vehicleId: string, quantity: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: POST,
      url: `${api.vehicles}/${vehicleId}/purchase`,
      data: {
        quantityToPurchase: quantity,
      },
    });
    console.log('Quantity->', quantity);

    console.log('Response->', response);

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