
'use client';

import { useState } from 'react';
import { performLogin } from '../../app/actions';
import { useAuth } from '../../app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const [error, setError] = useState('');

  const { setAuth } = useAuth();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const formData = new FormData(event.currentTarget);

      const found = await performLogin(formData);

      if (found) {
        // Login successful
        setAuth(found);

        toast.success('Login successful!');

        router.push('/');
      } else {
        // Email/password doesn't match
        toast.error('Invalid email or password!');
        setError('Please provide a valid login credential');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
      setError(err.message || 'Something went wrong!');
    }
  }

  return (
    <>
      <div className="my-2 text-red-500">
        {error}
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

