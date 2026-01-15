import axios, { AxiosError } from "axios";
import { authStore } from "@store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_DB_URL,
  withCredentials: true, // 🔑 allows refresh cookie
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// -------- REQUEST INTERCEPTOR --------
api.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------- RESPONSE INTERCEPTOR --------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");
        const newToken = res.data.accessToken;

        authStore
          .getState()
          .setAuth(newToken, authStore.getState().user);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        authStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
