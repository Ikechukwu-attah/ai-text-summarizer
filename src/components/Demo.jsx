import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/articles";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data?.summary };
      setArticle(newArticle);

      console.log(newArticle);
    }
  };

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            required
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            &#9166
          </button>
        </form>

        {/* Browse URL HISTORY */}
      </div>

      {/* Display RESULT */}
    </section>
  );
};

export default Demo;
