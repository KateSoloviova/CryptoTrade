import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  storedCredentials: { email: string; password: string }[];
  login: (email: string, password: string) => string | void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  storedCredentials: [],
  login: (email: string, password: string) => {
    const state = get();

    const existingUser = state.storedCredentials.find(
      (user) => user.email === email
    );

    if (existingUser) {
      if (existingUser.password === password) {
        set({ isLoggedIn: true });
        return;
      } else {
        return "Login failed: Incorrect password.";
      }
    } else {
      set((state) => ({
        storedCredentials: [...state.storedCredentials, { email, password }],
        isLoggedIn: true,
      }));
    }
  },
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;