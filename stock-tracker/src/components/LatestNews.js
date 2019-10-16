import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
const moment = require("moment");

const LatestNews = () => {
  const latestNews = useSelector(state => state.latestNews);
  const loading = useSelector(state => state.loading);
  const newsDisplay = latestNews.map((news, index) => (
    <div className="news" key={index}>
      <p className={index === 0 ? "first_news news_headline" : "news_headline"}>
        {" "}
        <a href={news.url}>{news.headline}</a>
      </p>
      <p className="news_time">{moment(news.datetime).fromNow()}</p>
      <p className="news_source">- {news.source}</p>
    </div>
  ));
  const errorValue = useSelector(state => state.error.latestNews);
  const error = latestNews.length === 0 ? true : errorValue;

  return (
    <div className="latestnews">
      <h3>LATEST NEWS</h3>
      {error ? (
        <p className="error__message">
          Error: Latest news can not be displayed
        </p>
      ) : loading > 0 && !latestNews.length ? (
        <Loading />
      ) : (
        newsDisplay
      )}
    </div>
  );
};

export default LatestNews;
