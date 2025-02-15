import axiosInstance from "./axiosInstance";

export type MethodType =
  | "get"
  | "post"
  | "delete"
  | "patch"
  | "put"
  | "head"
  | "options";

export type ConfigType = {
  url: string;
  method: MethodType;
  data?: any;
  params?: {
    page?: number;
    limit?: number;
    [key: string]: any;
  };
  headers?: {
    [key: string]: string;
  };
};

const index = async (config: ConfigType): Promise<any> => {
  try {
    const result = await axiosInstance({
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });

    return result?.data?.data || result?.data || result;
  } catch (error: any) {
    // Handle network errors
    if (!error.response) {
      console.error("Network Error:", error);

      throw new Error("Network Error");
    }

    // Handle HTTP errors
    const status = error.response.status;
    let message = "";
    if (status >= 400 && status < 500) {
      message = error.response.data.message || error.message || "Client Error";
    } else if (status >= 500) {
      message = error.response.data.message || error.message || "Server Error";
    }
    throw new Error(message || "On request something went wrong.");
  }
};

export default index;
