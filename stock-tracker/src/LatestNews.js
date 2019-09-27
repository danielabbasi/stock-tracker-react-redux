import React from "react";
import { useSelector } from "react-redux";

const LatestNews = () => {

    function timeDifference(current, previous) {

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
    
        const elapsed = current - previous;
    
        if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + 'min ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + 'h ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + 'd ago';   
        }
    }
    const currentTime = Date.now();

  const latestNews = useSelector(state => state.latestNews);
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
