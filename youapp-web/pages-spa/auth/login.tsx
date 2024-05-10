import Button from 'components/atoms/button';
import InputField from 'components/atoms/input-field';
import { youappService, YouAppServiceError } from 'services/youapp';
import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('aziz');
  const [password, setPassword] = useState('user-password');
  const canBeSubmitted = Boolean(username && password);
  const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identity = await youappService.auth.signIn({
      identifier: username,
      password: password
    }).catch((e: YouAppServiceError) => {
      if (e.response?.data.statusCode == HttpStatusCode.Unauthorized) {
        Swal.fire({
          title: "Unauthorized",
          text: "Your credential is not correct!",
          icon: "error"
        });
        return null;
      };

      throw e
    });

    if (!identity) return;

    window.localStorage.setItem("token", identity.data.token);
    navigate("/")
  };

  return (
    <div className="container mx-auto">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          className="mb-3"
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <InputField
          className="mb-3"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <div className="mt-4">
          <Button type="submit" disabled={!canBeSubmitted}>
            Login
          </Button>
        </div>
      </form>

      <div className="mt-4">
        No account? <Link to="/auth/registration">Register here</Link>
      </div>
    </div>
  );
};

export default LoginPage;