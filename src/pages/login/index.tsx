import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../component/organism/login-form";
import FullScreenSlideshow from "../../component/molecules/images-login";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/"); // Redirect to home page if token exists
    }
  }, [navigate]);

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
