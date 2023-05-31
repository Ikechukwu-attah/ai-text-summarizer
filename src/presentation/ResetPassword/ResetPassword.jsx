import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/auth";
const ResetPassword = () => {
  const [data, setData] = useState("");
  const [resetPassword, { error, isLoading }] = useResetPasswordMutation();

  const { token } = useParams();

  console.log({ token });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ token, data });
    resetPassword({ token, newPassword: data?.password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Reset Password</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center w-[100%]"
        >
          <input
            type="password"
            className=" w-[100%] p-2 border border-blue-500 focus:border-blue-700 focus:outline-none rounded"
            placeholder="New Password"
            required
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          <button className="w-full p-2 text-white bg-blue-500 rounded">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
