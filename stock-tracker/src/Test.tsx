import React, { useEffect } from "react";
import {
  socketService,
  LATEST_NEWS,
  COMPANY_OVERVIEW,
  CHART_DATA,
  TOP_PEERS,
  STOCK_DATA,
  SEARCH_INPUT
} from "socket";
import { LatestNews } from "features/latestNews/redux/actions";
import { CompanyOverviewData } from "features/overview/redux/actions";
import { ChartData } from "features/chart/redux/actions";
import { TopPeers } from "features/topPeers/redux/actions";
import { ResponseData } from "features/keyStats/redux/actions";
import { SearchData } from "features/search/redux/actions";

interface StockAPI {
  getNews: (stockSymbol: string) => Promise<LatestNews>;
  getCompanyOverview: (stockSymbol: string) => Promise<CompanyOverviewData>;
  getChartData: (stockSymbol: string, chartTime: string) => Promise<ChartData>;
  getPeersData: (stockSymbol: string) => Promise<TopPeers>;
  getKeyStats: (stockSymbol: string) => Promise<ResponseData>;
  getSuggestions: (searchInput: string) => Promise<SearchData>;
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

  private createFeatureID(feature: string) {
    return feature + Math.abs(Math.random() * 1000).toFixed(0);
  }

  private rpc<Payload, A>(feature: string, topic: string, ...args: A[]) {
    return new Promise<Payload>((resolve, reject) => {
      const replyTo = this.createFeatureID(feature);
      this.socket.emit(topic, replyTo, ...args);
      this.socket.on(replyTo, (payload: Result<Payload>) => {
        this.socket.off(replyTo);
        if (payload.isError) {
          reject(payload.isError);
        } else {
          resolve(payload.data);
        }
      });
    });
  }

  getNews(stockSymbol: string) {
    return this.rpc<LatestNews, string>("News", LATEST_NEWS, stockSymbol);
  }

  getCompanyOverview(stockSymbol: string) {
    return this.rpc<CompanyOverviewData, string>(
      "Overview",
      COMPANY_OVERVIEW,
      stockSymbol
    );
  }

  getChartData(stockSymbol: string, chartTime: string) {
    return this.rpc<ChartData, string>(
      "Chart",
      CHART_DATA,
      stockSymbol,
      chartTime
    );
  }

  getPeersData(stockSymbol: string) {
    return this.rpc<TopPeers, string>("Peers", TOP_PEERS, stockSymbol);
  }

  getKeyStats(stockSymbol: string) {
    return this.rpc<ResponseData, string>("KeyStats", STOCK_DATA, stockSymbol);
  }

  getSuggestions(searchInput: string) {
    return this.rpc<SearchData, string>(
      "Suggestions",
      SEARCH_INPUT,
      searchInput
    );
  }
}

const service = new StockService(socketService.create());

export const Rig = () => {
  useEffect(() => {
    // service
    //   .getNews("AAPL")
    //   .then(console.log)
    //   .catch(console.log);
    // service
    //   .getCompanyOverview("AAPL")
    //   .then(console.log)
    //   .catch(console.log);
    //   service
    //   .getChartData("AAPL", "1Y")
    //   .then(console.log)
    //   .catch(console.log);
    service
      .getSuggestions("AA")
      .then(console.log)
      .catch(console.log);
  }, []);
  return <div>HELLO WORLD</div>;
};
