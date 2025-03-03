'use client';

import { login } from '@/actions/auth-actions';
import { loginSchema, LoginSchema } from '@/lib/schemas/login schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader, Input } from '@/lib/next-ui';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { toast } from 'react-toastify';
import SocialLogin from './social-login';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await login(data);

    if (res.status === 'success') {
      router.push('/members');
      router.refresh();
    } else {
      toast.error(res.error as string);
    }
  };
  return (
    <Card className='w-2/5 mx-auto'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary'>
          <div className='flex flex-row gap-3 items-center'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold '>Login</h1>
          </div>
          <p className='text-neutral-500 '>Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4 '>
            <Input
              label='Email'
              defaultValue=''
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              label='password'
              variant='bordered'
              defaultValue=''
              type='password'
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color='secondary'
              type='submit'
            >
              Submit
            </Button>
            <SocialLogin />
            <div className='flex justify-center hover:underline text-sm '>
              <Link href='/forgot-password'>Forgot Password</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
