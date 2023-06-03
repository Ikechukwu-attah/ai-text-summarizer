import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, deleteIcon } from "../assets";
// import { useLazyGetSummaryQuery } from "../services/articles";
import {
  useGetAllSummarizedArticleQuery,
  useLazyGetSingleSummarizedArticleQuery,
  useSummarizedMutation,
  useLazyDeleteSummarizedArticleQuery,
} from "../services/articles";

import { v4 as uuidv4 } from "uuid";
import { checkLoginStatus } from "../Authorization/UserAuthentication";
const Demo = () => {
  const isLoggedIn = checkLoginStatus();

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const {
    data: allSummarizedArticleData,
    error: allSummarizedArticleError,
    isLoading: allSummarizedArticleIsLoading,
  } = useGetAllSummarizedArticleQuery();

  const [
    singleArticle,
    {
      data: singleArticleData,
      error: singleArticleError,
      isLoading: singleArticleIsLoading,
    },
  ] = useLazyGetSingleSummarizedArticleQuery();

  const [
    deleteArticle,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = useLazyDeleteSummarizedArticleQuery();

  const [summarized, { data, error, isLoading, isSuccess }] =
    useSummarizedMutation();

  // const uniqueId = uuidv4();

  const [copied, setCopied] = useState("");

  const [copyArticleSummary, setCopyArticleSummary] = useState("");

  // useEffect(() => {
  //   const articleFromLocalStorage = JSON.parse(
  //     localStorage.getItem("articles")
  //   );

  //   if (articleFromLocalStorage) {
  //     setAllArticles(articleFromLocalStorage);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("fetching data");
      const data = await summarized({ url: article.url });

      if (data?.data?.summary) {
        const newArticle = {
          ...article,
          summary: data?.data?.summary,
          // id: uniqueId,
        };

        const updateArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updateArticles);
        // localStorage.setItem("articles", JSON.stringify(updateArticles));
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
    <section className="w-full max-w-xl mt-16">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center"
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 w-5 my-2 ml-3"
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
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allSummarizedArticleData?.map((item, index) => (
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
              <p className="flex-1 text-sm font-medium text-blue-700 truncate font-satoshi ">
                {item?.url}
              </p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteArticle(item?._id);
                }}
              >
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="object-contain w-4 h-4"
                  style={{ color: "gray" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display RESULT */}

      <div className="flex items-center justify-center max-w-full my-10 ">
        {isLoading ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20" />
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            {" "}
            Well, that wasn't supposed to happen... <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {error.message}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                {isLoggedIn && (
                  <div
                    onClick={() => handleCopySummary(article?.summary)}
                    className="cursor-pointer"
                  >
                    <img
                      src={copyArticleSummary === article.summary ? tick : copy}
                      alt="copy_icon"
                      className="object-contain w-5 h-5 "
                    />
                  </div>
                )}
              </div>

              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">
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
