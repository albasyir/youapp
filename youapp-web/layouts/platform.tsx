import BackButton from "components/atoms/back-button";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoginResponseDto } from "sdk/youapp-service";
import { io, Socket } from "socket.io-client";

export type PlatformLayoutContext = {
  session: LoginResponseDto,
  socket: Socket
};

function PlatformLayout() {
  const navigate = useNavigate();
  const userDataStringtifed = window.localStorage.getItem("user");
  const isUnauthorized = !userDataStringtifed;

  useEffect(() => {
    if (isUnauthorized) navigate("/auth/login");
  }, [isUnauthorized, navigate]);

  if (isUnauthorized)
    return <>Redirecting...</>;

  const session: LoginResponseDto = JSON.parse(userDataStringtifed);
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log("connected")
  });

  const context: PlatformLayoutContext = {
    session, socket
  }

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black">
      <div className="mx-auto h-full max-w-sm bg-[#09141A] text-white p-4 overflow-y-auto">
        <div className="flex justify-between">
          <div className="w-1/3"><BackButton /></div>
          <div className="w-1/3 text-center">@{context.session.user.username}</div>
          <div className="w-1/3 text-right"></div>
        </div>

        <div className="mt-4">
          <Outlet context={context} />
        </div>
      </div>
    </div>
  );
}

export default PlatformLayout;
