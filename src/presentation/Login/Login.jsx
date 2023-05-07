import React, { useState } from "react";
import { useLoginUserMutation } from "../../services/auth";
import { data } from "autoprefixer";

const Login = () => {
  const [userLogin, { error, isLoading }] = useLoginUserMutation();

  const [data, setData] = useState();
  console.log({ data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log("event", e.target.value);
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

        <a href="#" className="self-start text-sm">
          Forget password
        </a>
      </div>
    </div>
  );
};

export default Login;
