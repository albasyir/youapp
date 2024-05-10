import { HttpStatusCode } from 'axios';
import Button from 'components/atoms/button';
import InputField from 'components/atoms/input-field';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { youappService, YouAppServiceError } from 'services/youapp';
import Swal from 'sweetalert2';

const RegistrationPage: React.FC = () => {
  const [username, setUsername] = useState("aziz");
  const [email, setEmail] = useState("abdulazizalbasyir119@gmail.com");
  const [password, setPassword] = useState("user-password");
  const [confirmPassword, setConfirmPassword] = useState("user-password");
  const canBeSubmitted = Boolean(password !== confirmPassword);
  const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!(username && password && email)) {
      return;
    }

    e.preventDefault();

    const identity = await youappService.auth
      .registration({
        username: username,
        password: password,
        email: email,
      })
      .catch((e: YouAppServiceError) => {
        if (e.response?.data.statusCode == HttpStatusCode.Conflict) {
          Swal.fire({
            title: "Email / Username has been used",
            text: "Please use other email / username",
            icon: "error",
          });
          return null;
        }

        throw e;
      });

    if (!identity) return;

    window.localStorage.setItem("token", identity.data.token);
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          className="mb-3"
          id="email"
          label="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <InputField
          className="mb-3"
          id="username"
          label="Create Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <InputField
          className="mb-3"
          id="password"
          label="Create Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <InputField
          className="mb-3"
          id="password-confirm"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder="Password"
        />
        <div className="mt-4">
          <Button type="submit" disabled={canBeSubmitted}>
            Register
          </Button>
        </div>
      </form>

      <div className="mt-4">
        Have an account? <Link to="/auth/login">Login here</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
