import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      auth layout
      <div onClick={() => {}}>back</div>
      {<Outlet />}
    </div>
  );
}

export default AuthLayout;