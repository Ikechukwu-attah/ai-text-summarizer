import React from "react";

const ForgetPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Enter email address</h1>
        <input
          type="email"
          className=" w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
          placeholder="email"
          required
        />
        <button className="w-full p-2 text-white bg-blue-500 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
