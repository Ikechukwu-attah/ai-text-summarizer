import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Login</h1>
        <input
          className="w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
          type="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className=" w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
          placeholder="Password"
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded">
          Login
        </button>
        <a href="#" className="self-start text-sm">
          Forget password
        </a>
      </div>
    </div>
  );
};

export default Login;
