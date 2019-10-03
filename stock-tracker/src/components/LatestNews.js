import React from "react";
import { useSelector } from 'react-redux';
const moment = require('moment');

const LatestNews = () => {
  const latestNews = useSelector((state) => state.latestNews)
  const newsDisplay = latestNews.map((news, index) => (
    <div key={index}>
      <p className="newsHeadline"> <a href={news.url}>{news.headline}</a></p>
      <p className="newsTime">{moment(news.datetime).fromNow()}</p>
      <p className="newsSource">- {news.source}</p>
    </div>
  ));

  
  return (
    <div className="latestnews">
      <h3>LATEST NEWS</h3>
      {newsDisplay}
    </div>
  );
};

export default LatestNews;
