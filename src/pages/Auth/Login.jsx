import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useGoogleLogin, useLogin } from '../../features/auth/hooks/useAuth';
import { z } from 'zod';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import GLogin from '@/components/common/auth/GLogin';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string(),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { mutate: login, isLoading, isError, error } = useLogin();
  const {
    mutate: googleLogin,
    isLoading: googleLoginLoading,
    isError: googleLoginIsError,
    error: googleLoginError,
  } = useGoogleLogin();
  const location = useLocation();
  const message = location?.state?.message;

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      setRememberMe(true);
      const savedEmail = localStorage.getItem('rememberMeEmail');
      const savedPassword = localStorage.getItem('rememberMePassword');

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    } else {
      setRememberMe(false);
    }
  }, []);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        for (const error of err.errors) {
          errors[error.path[0]] = error.message;
        }
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('rememberMeEmail', email);
      localStorage.setItem('rememberMePassword', password);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('rememberMeEmail');
      localStorage.removeItem('rememberMePassword');
    }
    login({ email, password });
  };

  const isFormValid = () => {
    try {
      loginSchema.parse({ email, password });
      return true;
    } catch {
      return false;
    }
  };

  const shouldShowPasswordRequirements = () => {
    if (!password) return false;
    if (isFormValid()) return false;
    return !(
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const errorMessage = error?.response?.data?.message || error?.message;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className='text-center mb-8'
        >
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>Sign in to continue to your account</p>
        </motion.div>

        {isError && (
          <div className='mb-4 px-2 py-1 bg-red-100  border-red-200 text-red-700 rounded'>
            {errorMessage}
          </div>
        )}

        {message && (
          <div className='mb-4 px-2 py-1 bg-green-100  border-green-200 text-green-700 rounded'>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out'
              placeholder='Enter your email'
            />
            {validationErrors.email && (
              <p className='mt-1 text-sm text-red-600'>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <div className='relative'>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out'
                placeholder='Enter your password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                {showPassword ? (
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                    />
                  </svg>
                ) : (
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                )}
              </button>
            </div>
            {validationErrors.password && (
              <p className='mt-1 text-sm text-red-600'>
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2' htmlFor='remember-me'>
              <Checkbox
                id='remember-me'
                className='cursor-pointer '
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <span className='text-gray-600 select-none'>Remember me</span>
            </label>
            {/* <Link
              to={ROUTES.FORGOT_PASSWORD}
              className='text-purple-600 hover:text-purple-500 transition-colors'
            >
              Forgot Password?
            </Link> */}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className='text-purple-600 hover:text-purple-500 font-semibold transition-colors'
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className='flex flex-col items-center justify-center mt-8'>
          <div className='w-full mb-4 flex items-center justify-center gap-3'>
            <div className='h-px bg-gray-300 w-full' />
            <span className='text-sm text-gray-500 whitespace-nowrap'>
              Or continue with
            </span>
            <div className='h-px bg-gray-300 w-full' />
          </div>
          <GLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
