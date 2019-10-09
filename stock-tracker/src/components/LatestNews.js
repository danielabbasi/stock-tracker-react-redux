import React from "react";
import { useSelector } from "react-redux";
import Loading from './loading';
const moment = require("moment");

const LatestNews = () => {
  const latestNews = useSelector(state => state.latestNews);
  const loading = useSelector(state => state.loading)
  const newsDisplay = latestNews.map((news, index) => (
    <div key={index}>
      <p className={index === 0 ? "firstNews newsHeadline" : "newsHeadline"}>
        {" "}
        <a href={news.url}>{news.headline}</a>
      </p>
      <p className="newsTime">{moment(news.datetime).fromNow()}</p>
      <p className="newsSource">- {news.source}</p>
    </div>
  ));

if(loading > 0 && !latestNews.length) {
  return(
    <div className="latestnews">
      <Loading/>
    </div>
  ) 
} else {
  return(
    <div className="latestnews">
      <h3>LATEST NEWS</h3>
      {newsDisplay}
    </div>
    )
  }
};

export default LatestNews;
