import { useGoogleLogin } from '@/features/auth/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

const GLogin = () => {
  const {
    mutate: googleLogin,
    isLoading: googleLoginLoading,
    isError: googleLoginIsError,
    error: googleLoginError,
  } = useGoogleLogin();

  return (
    <div className='transform transition-transform hover:scale-105'>
      <GoogleLogin
        cancel_on_tap_outside
        onSuccess={(credentialResponse) => {
          googleLogin({ token: credentialResponse.credential });
        }}
        onError={() => {
          toast.error('Login Failed');
        }}
        theme='outline'
        shape='pill'
        size='large'
        text='continue_with'
        locale='en'
      />
    </div>
  );
};

export default GLogin;
