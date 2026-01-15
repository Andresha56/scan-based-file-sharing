import { create } from "zustand";

interface AuthState {
  accessToken?: string;
  user?: any;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  clearAuth: () => void;
}

export const authStore = create<AuthState>((set) => ({
  accessToken: undefined,
  user: undefined,
  isAuthenticated: false,

  setAuth: (token, user) =>
    set({
      accessToken: token,
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      accessToken: undefined,
      user: undefined,
      isAuthenticated: false,
    }),
}));
