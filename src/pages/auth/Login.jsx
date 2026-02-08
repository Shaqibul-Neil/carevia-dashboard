import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (data) => {
    const userData = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    console.log(data);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      userData,
    );
    console.log(res);
    if (res.data.success) {
      const result = res.data.data;
      //saving the token in local storage so that it persists refresh
      localStorage.setItem("access-token", result.token);
      localStorage.setItem("user-info", JSON.stringify(result.user));

      //redirect to dashboard
      navigate(from, { replace: true });
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
