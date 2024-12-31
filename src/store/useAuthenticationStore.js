import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthenticationStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthenticationStore;
