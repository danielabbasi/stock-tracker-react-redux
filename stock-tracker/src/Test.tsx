import React, { useEffect } from "react";
import { socketService, LATEST_NEWS, COMPANY_OVERVIEW } from "socket";
import { LatestNews } from "features/latestNews/redux/actions";
import { CompanyOverviewData } from "features/overview/redux/actions";

interface StockAPI {
  getNews: (stockSymbol: string) => Promise<LatestNews>;
  getCompanyOverview: (stockSymbol: string) => Promise<CompanyOverviewData>;
}

type Error = {
  isError: true;
};

type Success<T> = {
  isError: false;
  data: T;
};

type Result<T> = Error | Success<T>;

class StockService implements StockAPI {
  constructor(private socket: SocketIOClient.Socket) {}

  getNews(stockSymbol: string) {
    return new Promise<LatestNews>((resolve, reject) => {
      this.socket.emit(LATEST_NEWS, "AAPL");
      this.socket.on("getNewsResult", (payload: Result<LatestNews>) => {
        if (payload.isError) {
          reject(payload.isError);
        } else {
          resolve(payload.data);
        }
      });
    });
  }

  getCompanyOverview(stockSymbol: string) {
    return new Promise<CompanyOverviewData>((resolve, reject) => {
      this.socket.emit(COMPANY_OVERVIEW, "AAPL");
      this.socket.on(
        "getOverviewResult",
        (payload: Result<CompanyOverviewData>) => {
          if (payload.isError) {
            reject(payload.isError);
          } else {
            resolve(payload.data);
          }
        }
      );
    });
  }
}

const service = new StockService(socketService.create());

export const Rig = () => {
  useEffect(() => {
    service
      .getNews("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getCompanyOverview("AAPL")
      .then(console.log)
      .catch(console.log);
  }, []);
  return <div>HELLO WORLD</div>;
};
