import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthActions, LoginData, Role } from "@lib/contanst";

import { MouseEvent } from "react";
import clsx from "clsx";
import useLogin from "@hook/logIn-hook";

export default function LoginForm() {
  const [displayPassword, setDisplayPassword] = useState(false);

  const { loading, error, logIn } = useLogin();
  const [role, setRole] = useState(Role.tenant);
  const { register, handleSubmit } = useForm<LoginData>();
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
      "uppercase py-2 px-1 cursor-pointer flex m-auto",
      (value === role && "font-bold underline") || "font-thin"
    );
  return (
    <div className="col-span-full w-[300px] p-3 relative z-70 bg-background">
      <div className="grid grid-cols-2">
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
      <form data-testid="sign-in-form" onSubmit={handleSubmit(submitLogIn)}>
        <label>
          <p>email</p>
          <input
            className="w-auto"
            {...register("username", {
              required: {
                value: true,
                message: "enter email",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "incorrect email format",
              },
            })}
            placeholder={"email"}
          />
          {/* <p type='error'>{errors?.email?.message}</p> */}
        </label>
        <label>
          <p>{"password"}</p>
          <div>
            <input
              className="w-auto"
              data-testid="sign-in-input-password"
              {...register("password", {
                required: {
                  value: true,
                  message: "enter password",
                },
              })}
              type={displayPassword ? "text" : "password"}
            />
            <div onClick={handleVisibilityPassword}>
              {(displayPassword && <Visibility />) || <VisibilityOff />}
            </div>
          </div>
        </label>

        {(loading && <>Loading</>) || (
          <input
            className="w-full uppercase text-center m-auto cursor-pointer"
            disabled={false}
            type="submit"
            value={"sign in"}
          />
        )}
      </form>
    </div>
  );
}
