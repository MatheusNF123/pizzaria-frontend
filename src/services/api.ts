import axios from "axios";

import { ApiReturnMessage } from "../Types";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
});

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0OWU0YWU4LTYyOTktNDA5NC04MmY3LTQyOGNhMzMyOGU5YSIsImVtYWlsIjoicHl0aG9uQHNjcmlwdC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzQ2ODUyODksImV4cCI6MTY3NDc1NzI4OX0.sbOPnFUOJVIW-mgcNjLfn5wkkzDLGmswyqcU4OapKGY";

// api.defaults.headers.common['Authorization'] = token;

type ApiResponse<T> = {
  data: T & Partial<ApiReturnMessage>;
  status: number;
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message !== "Network Error") {
      return error.response;
    }

    console.log("error");

    return Promise.reject(error);
  }
);

export const getRequest = async <T>(
  endPoint: string
): Promise<ApiResponse<T>> => {
  const { data, status } = await api.get(endPoint);
  return { data, status };
};

export const postRequest = async <T>(
  endPoint: string,
  body: any
): Promise<ApiResponse<T>> => {
  const { data, status } = await api.post(endPoint, body);
  return { data, status };
};

export const deleteRequest = async (endPoint: string) => {
  const { status } = await api.delete(endPoint);
  return { status };
};

export const putRequest = async (endPoint: string, body: any) => {
  const { data, status } = await api.put(endPoint, body);
  return { data, status };
};

export const patchRequest = async (endPoint: string) => {
  const { data, status } = await api.patch(endPoint);
  return { data, status };
};
