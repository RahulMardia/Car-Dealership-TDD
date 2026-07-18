import { api, POST } from "@/lib/apiConstants";
import { makeAPIRequest } from "@/lib/apiService";
import { IS_LOADING, SET_ERROR, USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import { AppDispatch } from "../store";


// Login action
export const loginAction = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: POST,
      url: api.login,
      data: { email, password },
    });

    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      dispatch({ type: USER_LOGIN, payload: response.user });
      return true; // Return success so UI can navigate
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Login failed";
    dispatch({ type: SET_ERROR, payload: errorMessage });
    return false;
  } finally {
    dispatch({ type: IS_LOADING, payload: false });
  }
};

export const adminLoginAction = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    const response: any = await makeAPIRequest({
      method: POST,
      url: api.login,
      data: { email, password },
    });

    if (response.success && response.token) {
     console.log('Admin Login->',response);
     
      if (response.data.role !== "admin") {
        throw new Error("Access Denied: You do not have administrator privileges.");
      }

     
      localStorage.setItem("token", response.token);
      dispatch({ type: USER_LOGIN, payload: response.data });
      return true;
    }
  } catch (error: any) {
    
    const errorMessage = error?.message || error?.response?.data?.message || "Admin Login failed";
    dispatch({ type: SET_ERROR, payload: errorMessage });
    return false;
  } finally {
    dispatch({ type: IS_LOADING, payload: false });
  }
};


// Register action
export const registerAction = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
   
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_ERROR, payload: null });

    
    const response: any = await makeAPIRequest({
      method: POST,
      url: api.register, 
      data: { name, email, password },
    });

    
    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      
      
      dispatch({ type: USER_LOGIN, payload: response.user }); 
      return true; 
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Registration failed";
    dispatch({ type: SET_ERROR, payload: errorMessage });
    return false;
  } finally {
    dispatch({ type: IS_LOADING, payload: false });
  }
};
// Logout action clean token from localStorage
export const logoutAction = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};