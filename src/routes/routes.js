import ForgetPassword from "../presentation/ForgetPassword/ForgetPassword";
import Home from "../presentation/Home";
import Login from "../presentation/Login/Login";
import ResetPassword from "../presentation/ResetPassword/ResetPassword";
import SignUp from "../presentation/SignUp/SignUp";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },

  {
    path: "/reset-password",
    component: ResetPassword,
  },

  {
    path: "/forgot-password",
    component: ForgetPassword,
  },
];

export const privateRoute = [];
