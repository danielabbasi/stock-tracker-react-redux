import React from "react";
const moment = require('moment');

const LatestNews = ({ latestNews }) => {

  const newsDisplay = latestNews.map((news, index) => (
    <div key={index}>
      <p className="newsHeadline">{news.headline}</p>
      <p className="newsTime">{moment(news.datetime).fromNow()}</p>
      <p className="newsSource">{news.source}</p>
    </div>
  ));

  
  return (
    <div>
      <h3>Latest news</h3>
      {newsDisplay}
    </div>
  );
};

export default LatestNews;
