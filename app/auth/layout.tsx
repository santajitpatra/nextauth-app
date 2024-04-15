import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tl from-cyan-400 to-sky-600">
      {children}
    </div>
  );
};

export default AuthLayout;
