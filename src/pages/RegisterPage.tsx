import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    await registerMutation.mutateAsync({ name: data.name, email: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="mb-8">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600">RealEstate</span>
          <span className="text-gray-900">Hub</span>
        </Link>
      </div>

      <div className="max-w-2xl w-full space-y-10 bg-white p-10 sm:p-12 border border-gray-100 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">
            Create Account
          </h2>
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
            Join our community today
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-6 md:gap-x-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                {...register('name')}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600 font-bold">{errors.name.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600 font-bold">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                className={`form-input ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Password"
              />
              {errors.password && <p className="mt-1 text-xs text-red-600 font-bold">{errors.password.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                className={`form-input ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600 font-bold">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors shadow-sm"
            >
              {registerMutation.isPending ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
