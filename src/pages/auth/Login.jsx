import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { showSuccessToast, showErrorToast } from "../../lib/utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  //state for error message
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); //clear previous errors

      const userData = {
        email: data.email.toLowerCase(),
        password: data.password,
      };

      //calling the mother app's api
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        userData,
      );

      if (res.data.success) {
        const result = res.data.data;
        //calling the login function of auth context
        login(result.token, result.user);
        showSuccessToast("Login successful! Welcome back");

        //redirect to dashboard
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || "Login failed";

        if (status === 401) {
          const errorMsg = "Invalid email or password. Please try again.";
          setErrorMessage(errorMsg);
          showErrorToast(errorMsg);
        } else if (status === 404) {
          const errorMsg = "User not found. Please register first.";
          setErrorMessage(errorMsg);
          showErrorToast(errorMsg);
        } else if (status === 500) {
          const errorMsg = "Server error. Please try again later.";
          setErrorMessage(errorMsg);
          showErrorToast(errorMsg);
        } else {
          setErrorMessage(message);
          showErrorToast(message);
        }
      } else if (error.request) {
        // Request made but no response
        const errorMsg = "Cannot connect to server. Please check your connection.";
        setErrorMessage(errorMsg);
        showErrorToast(errorMsg);
      } else {
        // Something else happened
        const errorMsg = "An unexpected error occurred. Please try again.";
        setErrorMessage(errorMsg);
        showErrorToast(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center lg:p-10 p-3 mt-12 lg:mt-0 max-w-md mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-secondary leading-tight">
            Welcome Back
          </h2>
          <p className="text-primary">
            Login with Carevia to access your dashboard
          </p>
        </div>
        {/* Error Message Display */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            <p>{errorMessage}</p>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="relative">
            <label className="block text-secondary mb-1">Email *</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="example@email.com"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-secondary mb-1">Password *</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Link to={"/forget-password"} className="text-primary underline">
              Forget Password?
            </Link>
          </div>

          {/* Login button */}
          <div className="flex justify-center">
            <button
              className="w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        {/* Demo Login Button Admin, Citizen and Staff */}

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 my-3">
          <div className="h-px w-16 bg-gray-400"></div>
          <span className="text-sm text-secondary">or</span>
          <div className="h-px w-16 bg-gray-400"></div>
        </div>

        {/* Google login */}

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-700 mt-3 ">
          Don't have an account?{" "}
          <a
            className="underline text-md text-primary font-bold cursor-pointer"
            href={`${import.meta.env.VITE_API_URL}/register`}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
