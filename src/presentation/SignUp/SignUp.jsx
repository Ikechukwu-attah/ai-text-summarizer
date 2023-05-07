import React, { useState } from "react";

import { useRegisterUserMutation } from "../../services/auth";

const SignUp = () => {
  const [data, setData] = useState();
  const [registerUser, { error, isLoading }] = useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ data });
    registerUser(data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen  p-4 sm:w-full   md:w-1/2 lg:w-[20%] ">
        <h1 className="text-2xl text-center">Register</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 items-center justify-center w-[100%]"
        >
          {" "}
          <input
            className="w-[100%] p-2 border border-gray-400 focus:border-blue-700 focus:outline-none rounded"
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={handleChange}
            value={data.email}
          />
          <input
            type="password"
            className=" w-[100%] p-2 border border-gray-400 focus:border-blue-700 focus:outline-none rounded"
            placeholder="Password"
            required
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          <input
            type="tel"
            className=" w-[100%] p-2 border border-gray-400 focus:border-blue-700 focus:outline-none rounded"
            placeholder="Phone Number"
            required
            name="phone"
            onChange={handleChange}
            value={data.phone}
          />
          <button className="w-full p-2 text-white bg-blue-500 rounded">
            Register
          </button>
        </form>

        <a href="#" className="self-start text-xs">
          Already have an account? login
        </a>
      </div>
    </div>
  );
};

export default SignUp;
