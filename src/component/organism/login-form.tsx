import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../atom/input";
import Button from "../atom/button";
import { login } from "../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await login(data.username, data.password);
      const token = response.token;
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your username or password.", {
        position: "top-left",
        autoClose: 3000,
      });
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-80 mx-auto my-48">
      {/* ToastContainer to render the toast notifications */}
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8">
          <img src={"/assets/images/Jasa_Marga_logo.webp"} alt="logo" />
        </div>

        <Input
          label="Username"
          placeholder="Insert Username"
          {...register("username", { required: "Username is required" })}
          error={errors.username?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Insert Password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <Button
          className="w-full"
          label={loading ? "Loading..." : "Login"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default LoginForm;
