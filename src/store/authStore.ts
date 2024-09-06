import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  storedCredentials: { email: string; password: string }[];
  login: (email: string, password: string) => string | void;
  logout: () => void;
  initializeFromSession: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  storedCredentials: [],
  
  initializeFromSession: () => {
    const storedUser = sessionStorage.getItem('authCredentials');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      set({
        storedCredentials: [parsedUser],
        isLoggedIn: true,
      });
    }
  },

  login: (email: string, password: string) => {
    const state = get();

    const existingUser = state.storedCredentials.find(
      (user) => user.email === email
    );

    if (existingUser) {
      if (existingUser.password === password) {
        set({ isLoggedIn: true });
        sessionStorage.setItem(
          'authCredentials',
          JSON.stringify({ email, password })
        );
        return;
      } else {
        return "Login failed: Incorrect password.";
      }
    } else {
      set((state) => ({
        storedCredentials: [...state.storedCredentials, { email, password }],
        isLoggedIn: true,
      }));
      sessionStorage.setItem(
        'authCredentials',
        JSON.stringify({ email, password })
      );
    }
  },

  logout: () => {
    sessionStorage.removeItem('authCredentials');
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;