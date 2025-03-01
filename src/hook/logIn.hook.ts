import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/gql/endpoint";
import { LoginData } from "@/lib/contanst";
import { useAuthStore } from "@/store/auth-store";
import { setCookie } from "@/lib/cookies-handler";
interface LoginResult {
  loading: boolean;
  error: string | null;
  logIn: (userInput: LoginData) => Promise<void>;
}

const useLogin = (): LoginResult => {
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { logIn } = data;
      if (logIn?.access_token) {
        localStorage.setItem("token", logIn.access_token);
        console.log("Login Success, token:", logIn.access_token);
        setCookie("jwt", logIn.access_token);
        setAuth(logIn.access_token);
      } else {
        console.log("Token was not received");
      }
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
      setError(error.message);
      setLoading(false);
    },
  });

  const logIn = async (loginData: LoginData) => {
    setLoading(true);
    setError(null);
    await loginMutation({ variables: { userInput: loginData } });
  };

  return { loading, error, logIn };
};

export default useLogin;
