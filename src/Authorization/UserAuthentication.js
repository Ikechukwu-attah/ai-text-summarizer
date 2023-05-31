import { retry } from "@reduxjs/toolkit/dist/query";
import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export const checkLoginStatus = () => {
  const accessToken = cookie.get("token");
  console.log({ accessToken });

  if (!accessToken) return false;
  try {
    return jwt_decode(accessToken);
  } catch (error) {}
};
