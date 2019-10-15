import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
const moment = require("moment");

const LatestNews = () => {
  const latestNews = useSelector(state => state.latestNews);
  const loading = useSelector(state => state.loading);
  const newsDisplay = latestNews.map((news, index) => (
    <div key={index}>
      <p className={index === 0 ? "first_news news_headline" : "news_headline"}>
        {" "}
        <a href={news.url}>{news.headline}</a>
      </p>
      <p className="news_time">{moment(news.datetime).fromNow()}</p>
      <p className="news_source">- {news.source}</p>
    </div>
  ));

  if (loading > 0 && !latestNews.length) {
    return (
      <div className="latest_news">
        <h1>LATEST NEWS</h1>
        <Loading />
      </div>
    );
  }
  return (
    <div className="latest_news">
      <h1>LATEST NEWS</h1>
      <div className="latest_news__content">{newsDisplay}</div>
    </div>
  );
};

export default LatestNews;
