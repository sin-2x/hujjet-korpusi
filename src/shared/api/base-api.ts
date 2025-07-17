import { useAuthStore } from "@/entities";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
   baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
   const token = useAuthStore.getState().token;
   config.headers.Authorization = `Token ${token}`;
   return config;
});

// $api.interceptors.response.use(
//    (config) => config,
//    async (error) => {
//       const originalRequest = error.config;
//       if (error.response?.status === 401 && !originalRequest._isRetry) {
//          originalRequest._isRetry = true;
//          try {
//             const response = await axios.get(`${API_URL}/refresh`, {
//                withCredentials: true,
//             });
//             const newToken = response.data.message;
//             const authStore = useAuthStore.getState();
//             authStore.setToken(newToken);
//             return $api.request(originalRequest);
//          } catch (e) {
//             const authStore = useAuthStore.getState();
//             authStore.setIsAuth(false);
//             authStore.setToken(null);
//          }
//       }

//       throw error;
//    }
// );
// export const apiClient = {
//    get: <T>(url: string, config?: any) =>
//       $api.get<ApiResponse<T>>(url, config).then((res) => res.data),

//    post: <T>(url: string, data?: any, config?: any) =>
//       $api.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

//    put: <T>(url: string, data?: any, config?: any) =>
//       $api.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

//    delete: <T>(url: string, config?: any) =>
//       $api.delete<ApiResponse<T>>(url, config).then((res) => res.data),

//    patch: <T>(url: string, data?: any, config?: any) =>
//       $api.patch<ApiResponse<T>>(url, data, config).then((res) => res.data),
// };z
