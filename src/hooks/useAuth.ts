import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { login, logout, register } from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, logout: clearStore } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation<AuthResponse, AxiosError<{ error: string }>, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Logged in successfully!");
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Invalid email or password");
    }
  });

  const registerMutation = useMutation<{ message: string }, AxiosError<{ error: string }>, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
      navigate('/login', { state: { message: 'Account created, please log in' } });
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Registration failed. Please try again.");
    }
  });

  const logoutMutation = useMutation<{ message: string }, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      clearStore();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate('/login');
    },
    onError: () => {
      toast.error("Failed to logout. Please try again.");
    }
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
};
