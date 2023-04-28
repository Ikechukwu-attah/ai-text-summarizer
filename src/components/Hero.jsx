import React from "react";
import { ailogo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={ailogo} alt="AtAI_logo" className="w-28 object-contain" />
        <div className="flex gap-2">
          {" "}
          <button
            type="button"
            onClick={() => window.open("https://github.com/Ikechukwu-attah")}
            className="black_btn"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => window.open("https://github.com/Ikechukwu-attah")}
            className="black_btn"
          >
            SignUp
          </button>
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
