import BackButton from "components/atoms/back-button";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black">
      <div className="mx-auto h-full max-w-sm from-[#09141A] to-[#1F4247] bg-gradient-to-tr p-8 text-white">
        <div className="relative w-[331px] h-15 bg-transparent">
        </div>
        <BackButton />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;