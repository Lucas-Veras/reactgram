import { IConfig } from "../interfaces/Config";

export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (
  method: string,
  data: any,
  token = null,
  image: null | boolean = null,
) => {
  let config: IConfig;

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
};
