// src/store/authStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  user_id: number;
  type: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: string;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: (user, token) => {
        set({ user, isAuthenticated: true, token: token });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    },
  ),
);
