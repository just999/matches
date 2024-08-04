import LoginForm from './login-form';
import { cookies } from 'next/headers';

const LoginPage = () => {
  const csrfToken = cookies().get('authjs.csrf-token')?.value ?? '';
  return (
    <div className='flex items-center justify-center vertical-center'>
      <input type='hidden' name='csrfToken' value={csrfToken} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
