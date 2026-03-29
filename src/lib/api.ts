import axios from "axios";
import { toast } from "sonner";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../types/auth";
import type { ListingsQueryParams, ListingsResponse, SingleListingResponse } from "../types/listing";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please slow down.");
    } else if (error.response?.status === 500) {
      toast.error("An unexpected server error occurred.");
    }
    return Promise.reject(error);
  }
);

export default api;

//  Auth API 
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<{ message: string }> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const getMe = async (): Promise<{ user: User }> => {
  const res = await api.get("/auth/me");
  return res.data;
};

//  Listings API 
export const getListings = async (params: ListingsQueryParams): Promise<ListingsResponse> => {
  const res = await api.get("/listings", { params });
  return res.data;
};

export const getListing = async (id: number | string): Promise<SingleListingResponse> => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

