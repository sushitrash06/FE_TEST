import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../atom/input";
import Button from "../atom/button";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      console.log("Submitting data:", data);
      const token = "mock-token"; // Simulate receiving a token from the API
      localStorage.setItem("authToken", token);
      navigate("/"); // Navigate to home on successful login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-80 mx-auto my-48" onSubmit={handleSubmit(onSubmit)}>
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

      <Button className="w-full" label={loading ? "Loading..." : "Login"} type="submit" disabled={loading} />
    </form>
  );
};

export default LoginForm;
