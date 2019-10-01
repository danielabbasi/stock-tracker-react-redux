import React from "react";
import {useSelector} from 'react-redux'

const LatestNews = () => {
  function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    return (elapsed < msPerHour) ? Math.round(elapsed / msPerMinute) + "min ago"
    : (elapsed < msPerDay) ? Math.round(elapsed / msPerHour) + "hrs ago"
    : (elapsed < msPerMonth) ? Math.round(elapsed / msPerDay) + "days ago"
    : (elapsed < msPerYear) ? Math.round(elapsed / msPerMonth) + "months ago"
    : ""
  }
  const latestNews = useSelector((state) => state.latestNews)
  const currentTime = Date.now();
  const newsDisplay = latestNews.map((news, index) => (
    <div key={index}>
      <p className="newsHeadline">{news.headline}</p>
      <p className="newsTime">{timeDifference(currentTime, news.datetime)}</p>
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
