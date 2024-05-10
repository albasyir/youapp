import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages-spa/auth/login';
import RegistrationPage from 'pages-spa/auth/registration';
import ProfilePage from 'pages-spa/profile';
import AuthLayout from 'layouts/auth';
import PlatformLayout from 'layouts/platform';
import ProfileEditPage from 'pages-spa/profile/edit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>

        <Route element={<PlatformLayout />}>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/me/edit" element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
