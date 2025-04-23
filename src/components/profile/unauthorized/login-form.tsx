import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthActions, Role, LoginData } from "@/lib/contanst";
import { MouseEvent } from "react";
import clsx from "clsx";
import useLogin from "@/hook/logIn.hook";

export default function LoginForm() {
  const [displayPassword, setDisplayPassword] = useState(false);
  const { loading, logIn } = useLogin();
  const [role, setRole] = useState(Role.tenant);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const handleVisibilityPassword = () => {
    setDisplayPassword((prev) => !prev);
  };

  const submitLogIn: SubmitHandler<LoginData> = async (data) => {
    data.role = role;
    data.action = AuthActions.LOG_IN;
    try {
      await logIn(data);
    } catch (e) {
      console.log(e);
    }
  };

  const roleHandler = (e: MouseEvent<HTMLDivElement>) => {
    const role = e.currentTarget.getAttribute("data-role");
    if (role) {
      setRole(role as Role);
    }
  };

  const roleClass = (value: Role) =>
    clsx(
      "uppercase py-3 px-4 cursor-pointer transition-colors duration-200 text-center",
      "text-sm font-medium",
      value === role
        ? "text-primary border-b-2 border-primary"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    // <div className="col-span-full w-[300px] p-3 relative z-70 bg-background"></div>
    <div className="col-span-full w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-sm border">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <div className="grid grid-cols-2 border-b">
        <div
          className={roleClass(Role.tenant)}
          data-role={Role.tenant}
          onClick={roleHandler}
        >
          Tenant
        </div>
        <div
          className={roleClass(Role.landlord)}
          data-role={Role.landlord}
          onClick={roleHandler}
        >
          Landlord
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(submitLogIn)}>
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="your@email.com"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
              {...register("password", {
                required: "Password is required",
              })}
              type={displayPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={handleVisibilityPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              {displayPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
