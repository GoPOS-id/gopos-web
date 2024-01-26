import axios, { AxiosInstance } from "axios";
import { Configuration } from "./constants/configuration";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: Configuration.baseUrl,
});
