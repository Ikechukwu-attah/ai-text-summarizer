import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, deleteIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/articles";

import { v4 as uuidv4 } from "uuid";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const uniqueId = uuidv4();
  const [copied, setCopied] = useState("");
  const [copyArticleSummary, setCopyArticleSummary] = useState("");

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("fetching data");
      const data = await getSummary({ articleUrl: article.url });

      if (data?.data?.summary) {
        const newArticle = {
          ...article,
          summary: data?.data?.summary,
          id: uniqueId,
        };

        const updateArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updateArticles);
        localStorage.setItem("articles", JSON.stringify(updateArticles));
      } else {
        console.log("no summary in data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log("data kudos");
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopySummary = (copySummary) => {
    setCopyArticleSummary(copySummary);
    navigator.clipboard.writeText(copySummary);
    setTimeout(() => setCopyArticleSummary(false), 3000);
  };

  const deleteUrl = (id) => {
    const key = "articles";
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      const updateValue = parsedValue.filter((item) => item.id != id);

      localStorage.setItem(key, JSON.stringify(updateValue));
      setAllArticles(updateValue);
      setArticle(updateValue);
    }

    console.log("uuid", id);
  };

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
            ↵
          </button>
        </form>

        {/* Browse URL HISTORY */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate
              "
              >
                {item?.url}
              </p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUrl(item?.id);
                }}
              >
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="w-4 h-4 object-contain"
                  style={{ color: "gray" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display RESULT */}

      <div className="my-10 max-w-full flex justify-center items-center ">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            {" "}
            Well, that wasn't supposed to happen... <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error.message}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between w-full items-center">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div
                  onClick={() => handleCopySummary(article?.summary)}
                  className="cursor-pointer"
                >
                  <img
                    src={copyArticleSummary === article.summary ? tick : copy}
                    alt="copy_icon"
                    className="w-5 h-5 object-contain "
                  />
                </div>
              </div>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
