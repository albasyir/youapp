"use client"

import InputField from '@/components/atoms/input-field';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!(username && password)) {
      return;
    }

    e.preventDefault();


    
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
