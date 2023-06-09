import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ailogo } from "../assets";
import { Link } from "react-router-dom";
import { checkLoginStatus } from "../Authorization/UserAuthentication";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery, useSingleUserQuery } from "../services/users";

const Hero = () => {
  const isLoggedIn = checkLoginStatus();
  console.log({ isLoggedIn });
  const user = useSelector((state) => state.user);

  const { data: users, error, isLoading, isSuccess } = useGetAllUserQuery();
  const { data: singleUser } = useSingleUserQuery(isLoggedIn?.id);

  console.log("single user", singleUser);

  // useEffect(() => {
  //   console.log("redux user", users);
  // }, [users]);

  console.log("All users", users);
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <header className="flex flex-col items-center justify-center w-full">
      <nav className="flex items-center justify-between w-full pt-3 mb-10">
        <img src={ailogo} alt="AtAI_logo" className="object-contain w-28" />
        <div className="flex gap-2">
          {!isLoggedIn ? (
            <Link to="/login">
              {" "}
              <button
                type="button"
                // onClick={() => window.open("https://github.com/Ikechukwu-attah")}

                className="black_btn"
              >
                Login
              </button>
            </Link>
          ) : (
            <div>
              <h2>{isLoggedIn?.email}</h2>
              <div className="text-lg cursor-pointer" onClick={logOut}>
                <h2>logout</h2>
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <Link to="/signup">
              <button
                type="button"
                // onClick={() => window.open("https://github.com/Ikechukwu-attah")}
                className="black_btn"
              >
                SignUp
              </button>
            </Link>
          )}
        </div>
      </nav>
      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an Open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
