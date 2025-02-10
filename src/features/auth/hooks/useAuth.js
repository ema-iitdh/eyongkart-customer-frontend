import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { authService } from '../../../api/services/auth.service';
import { ROUTES } from '../../../constants/routes';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthenticationStore from '@/store/useAuthenticationStore';

// Custom hook to manage authentication state
export const useAuth = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useAuthenticationStore();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('user-storage');
      if (!storedData) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const parsedData = JSON.parse(storedData);
      const userData = parsedData?.state?.user;
      const isAuthData = parsedData?.state?.isAuthenticated;

      setIsAuthenticated(!!isAuthData);
      setUser(userData || null);
    } catch (error) {
      console.error('Error parsing auth data:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [setIsAuthenticated, setUser]);

  return { isAuthenticated, user };
};

// Login hook
export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useAuthenticationStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries('user');
      const from = location.state?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    },
  });
};

// Signup hook
export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.invalidateQueries('user');
      navigate(ROUTES.LOGIN, {
        state: {
          message: 'Account created successfully! Please login to continue.',
        },
      });
    },
  });
};

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthenticationStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
      redirect(ROUTES.LOGIN);
    },
    onError() {
      toast.error('Failed to logout');
    },
  });
};

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useAuthenticationStore();

  return useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries('user');
      navigate(ROUTES.HOME, { replace: true });
    },
  });
};
