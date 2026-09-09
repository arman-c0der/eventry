
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

    try {
        const formData = new FormData(event.currentTarget);

        const found = await performLogin(formData);

        if (!found) {
            toast.error("Invalid email or password!");
            return;
        }

        setAuth(found);
        toast.success("Login successful!");

        router.push("/");
    } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong. Please try again.");
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

