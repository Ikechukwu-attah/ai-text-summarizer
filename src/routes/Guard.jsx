import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../Authorization/UserAuthentication";
import { useEffect } from "react";

const isLoggedIn = checkLoginStatus();

export const PublicRouteGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export const ProtectedRouteGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, []);

  return <>{children}</>;
};
