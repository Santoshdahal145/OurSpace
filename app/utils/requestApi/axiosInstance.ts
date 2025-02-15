import axios from "axios";

// Extend AxiosResponse to include the 'ok' property
declare module "axios" {
  export interface AxiosResponse<T = any> {
    ok?: boolean;
  }
}

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "23452",
});

// Clear Axios configuration and remove token from AsyncStorage
export const clearAxiosConfig = () => {
  delete axiosInstance.defaults.headers.Authorization;
  delete axiosInstance.defaults.headers.common.Authorization;
};

// Set Authorization header and store token in AsyncStorage
export const setAuthorizationHeader = (token: string = "") => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

// Set base URL for Axios instance
export const setAxiosInstanceBaseURL = (baseURL: string) => {
  axiosInstance.defaults.baseURL = baseURL;
};

export default axiosInstance;
