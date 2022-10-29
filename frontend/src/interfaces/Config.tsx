export interface IConfig {
  method?: string;
  body?: any;
  headers?: {
    "Content-Type"?: string;
    Authorization?: any;
  };
}
