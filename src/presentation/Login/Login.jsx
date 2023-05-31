import React, { useState } from "react";
import { useLoginUserMutation } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [userLogin, { data: user, error, isLoading, isSuccess }] =
    useLoginUserMutation();

  const [data, setData] = useState();
  console.log({ data });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      console.log("user", user?.result?.email);
    }
  }, [isSuccess]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userData", data);
    userLogin(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 items-center justify-center w-[100%]"
        >
          <input
            className="w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
            type="email"
            placeholder="Email"
            required
            name="email"
            value={data?.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className=" w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
            placeholder="Password"
            required
            name="password"
            value={data?.password}
            onChange={handleChange}
          />
          <button className="w-full p-2 text-white bg-blue-500 rounded">
            Login
          </button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <a href="/forgot-password" className="self-start text-xs">
            Forget password
          </a>

          <span className="text-xs">
            Dont have account?{" "}
            <a href="/signup" className="self-start text-xs text-blue-800">
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
