import { useState } from "react";
import bannar from "../assets/bannar.png";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from './../assets/Logo.jpeg'

type LoginData = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(data);

      return {
        success: true,
      };
    },

    onSuccess: () => {
      alert("Login Success");
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10 overflow-hidden relative"
      style={{
        backgroundImage: `url(${bannar})`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* login card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#1E3A8A]/20 bg-white/90 shadow-2xl backdrop-blur-xl p-6 md:p-8">
        {/* top */}
        <div className="text-center mb-8">
          <div className="sm:w-80 mx-auto">
            <img className="" src={logo} alt="" />
          </div>
          <h1 className="text-3xl md:text-4xl  text-[#0F172A]">
            Welcome Back
          </h1>

        </div>

        {/* form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* email */}
          <div>
            <label className="text-[#0F172A] text-sm font-medium mb-2 block">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-[#CBD5E1] bg-white px-4 transition focus-within:border-[#1E466E]">
              <Mail className="w-5 h-5 text-[#1E466E]" />

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-4 outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label className="text-[#0F172A] text-sm font-medium mb-2 block">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-[#CBD5E1] bg-white px-4 transition focus-within:border-[#1E466E]">
              <Lock className="w-5 h-5 text-[#1E466E]" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-4 outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#1E466E]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* forgot */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-[#DC0000] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* login button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-[#1E466E] hover:bg-[#1E466E] transition-all duration-300 py-4 text-white  text-lg shadow-lg disabled:opacity-60"
          >
            {loginMutation.isPending ? "Logging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;