import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../services/auth";

const ForgetPassword = () => {
  const [data, setData] = useState("");
  const [forgetPassword, { error, isLoading }] = useForgetPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ data });
    forgetPassword(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Enter your email address</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 items-center justify-center w-[100%]"
        >
          <input
            onChange={handleChange}
            type="email"
            className=" w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
            placeholder="email"
            value={data?.email}
            name="email"
            required
          />
          <button className="w-full p-2 text-white bg-blue-500 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
