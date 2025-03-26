import { useLazyQuery, useQuery } from "@apollo/client";
import { VERIFY_USER } from "@/lib/gql/endpoint";
import { useAuthStore } from "@/store/auth-store";
import { getCookie } from "@/lib/cookies-handler";
import { Role } from "@/lib/contanst";

export const useVerifyUser = () => {
  const { setUser, setAuth } = useAuthStore();
  const { loading, refetch } = useQuery(VERIFY_USER, {
    onCompleted: (data) => {
      const { tenant, landlord } = data.verifyUser;
      setAuth(getCookie("jwt"));
      if (tenant) {
        const { _typename, ...user } = tenant;
        user.role = Role.tenant;
        setUser(user);
      } else if (landlord) {
        const { _typename, ...user } = landlord;
        user.role = Role.landlord;
        setUser(user);
      }
    },
    onError: (error) => {
      console.error(error);
      setUser(undefined);
      setAuth(undefined);
    },
  });
  return { loading, refetch };
};

export const useLazyVerifyUser = () => {
  const { setUser, setAuth } = useAuthStore();
  const [verifyUser] = useLazyQuery(VERIFY_USER, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      const { tenant, landlord } = data.verifyUser;
      setAuth(getCookie("jwt"));
      if (tenant) {
        const { _typename, ...user } = tenant;
        user.role = Role.tenant;
        setUser(user);
      } else if (landlord) {
        const { _typename, ...user } = landlord;
        user.role = Role.landlord;
        setUser(user);
      }
    },
    onError: (error) => {
      console.error(error);
      setUser(undefined);
      setAuth(undefined);
    },
  });
  return { verifyUser };
};
