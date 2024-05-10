import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {
  // for SSR purposes
  children?: React.ReactNode;
};

function PlatformLayout() {
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();

  const isUnauthorized = !token;

  useEffect(() => {
    if (isUnauthorized)  navigate("/auth/login");
  }, [isUnauthorized, navigate]);

  if (isUnauthorized)
    return <>Redirecting...</>;

  return (
    <div className="min-h-max">
      platform layout: {token}
      <Outlet />
    </div>
  );
}

export default PlatformLayout;
