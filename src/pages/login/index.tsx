import React from "react";
import LoginForm from "../../component/organism/login-form";
import FullScreenSlideshow from "../../component/molecules/images-login";

const Login: React.FC = () => {
  return (
    <div className="flex justify-between bg-white h-[100vh]">
      <div className="w-full">
        <LoginForm />
      </div>
      <FullScreenSlideshow />
    </div>
  );
};

export default Login;
