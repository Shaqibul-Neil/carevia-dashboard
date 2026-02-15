import { Heart, MessageCircle, Shield, Activity } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { showSuccessToast, showErrorToast } from "../../lib/utils";
import Button from "../../components/shared/button/Button";

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
        const errorMsg =
          "Cannot connect to server. Please check your connection.";
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
    <div className="min-h-screen w-full flex aurora-bg text-foreground overflow-hidden font-sans">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10 border-r-2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-background leading-tight">
              Welcome Back
            </h2>
            <p className="text-muted">
              Please login to access your dashboard for a better experience.
            </p>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xs text-sm">
              <p>{errorMessage}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div className="relative">
              <label className="block text-secondary mb-1.5 font-medium">
                Email *
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="example@email.com"
                className="w-full py-2.5 px-4 bg-muted/50 border border-border rounded-xs focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1 transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <label className="block text-secondary mb-1.5 font-medium">
                Password *
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className="w-full py-2.5 px-4 bg-muted/50 border border-border rounded-xs focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1 transition-all"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to={"/forget-password"}
                className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold underline"
              >
                Forget Password?
              </Link>
            </div>
            {/* Login button */}
            <div className="flex justify-center">
              <Button
                className="w-full py-3 justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-6">
            <div className="h-px w-16 bg-border"></div>
            <span className="text-sm text-muted-foreground">or</span>
            <div className="h-px w-16 bg-border"></div>
          </div>
          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <a
              className="underline text-md text-primary font-bold cursor-pointer hover:text-primary/80 transition-colors"
              href={`${import.meta.env.VITE_API_URL}/register`}
            >
              Register
            </a>
          </p>
        </div>
      </div>
      {/* Right Side: Aurora Background & Carevia Info */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        {/* Content Container (z-10 to sit above aurora lights) */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white/90 w-full max-w-2xl">
          <div className="mb-8">
            <div className="h-14 w-14 rounded-xs glass-card flex items-center justify-center mb-6 shadow-sm">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-md">
              Carevia Portal
            </h1>
            <p className="text-lg xl:text-xl text-white/70 max-w-md drop-shadow-sm">
              Your comprehensive platform for booking care packages and
              connecting with professional caregivers.
            </p>
          </div>
          <div className="space-y-4 mt-8">
            {/* Compassionate Care */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xs transition-all duration-300 hover:bg-white/10">
              <div className="h-10 w-10 rounded-xs bg-rose-500/20 flex items-center justify-center">
                <Heart className="h-5 w-5 text-rose-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Specialized Care
                </h3>
                <p className="text-white/60 text-sm">
                  Book sick care & baby care packages
                </p>
              </div>
            </div>
            {/* Real-time Support */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xs transition-all duration-300 hover:bg-white/10">
              <div className="h-10 w-10 rounded-xs bg-purple-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Live Support
                </h3>
                <p className="text-white/60 text-sm">
                  Chat with admins & get updates instantly
                </p>
              </div>
            </div>
            {/* Secure Payments */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xs transition-all duration-300 hover:bg-white/10">
              <div className="h-10 w-10 rounded-xs bg-emerald-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Secure Payments
                </h3>
                <p className="text-white/60 text-sm">
                  Safe transactions & transparent billing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
