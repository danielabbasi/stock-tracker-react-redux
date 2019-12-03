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
import uuid from "uuid/v4";

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

export type RpcClient = <Payload, A>(
  topic: string,
  ...args: A[]
) => Promise<Payload>;

export const createRpcClient = (
  socket: Pick<SocketIOClient.Socket, "emit" | "on" | "off">,
  createCorrelation = uuid
  // promiseTimeout: any = timeoutPromise2
) => <Payload, A>(topic: string, ...args: A[]) => {
  return new Promise<Payload>((resolve, reject) => {
    const replyTo = topic + createCorrelation();
    socket.emit(topic, replyTo, ...args);
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      socket.off(replyTo);
      reject("Promise took too long");
    }, 5000);
    socket.on(replyTo, (payload: Result<Payload>) => {
      console.info("socket on " + replyTo);
      socket.off(replyTo);
      console.info("socket off " + replyTo);
      payload.isError ? reject(payload.isError) : resolve(payload.data);
    });
  });
  // return promiseTimeout(5000, r);
};

const stockService: (rpc: RpcClient) => StockAPI = rpc => ({
  getNews: (stockSymbol: string) =>
    rpc<LatestNews, string>(LATEST_NEWS, stockSymbol),

  getCompanyOverview: (stockSymbol: string) =>
    rpc<CompanyOverviewData, string>(COMPANY_OVERVIEW, stockSymbol),

  getChartData: (stockSymbol: string, chartTime: string) =>
    rpc<ChartData, string>(CHART_DATA, stockSymbol, chartTime),

  getPeersData: (stockSymbol: string) =>
    rpc<TopPeers, string>(TOP_PEERS, stockSymbol),

  getKeyStats: (stockSymbol: string) =>
    rpc<ResponseData, string>(STOCK_DATA, stockSymbol),

  getSuggestions: (searchInput: string) =>
    rpc<SearchData, string>(SEARCH_INPUT, searchInput)
});

const timeoutPromise2 = <T extends unknown>(
  time: number,
  promise: Promise<T>
) => {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject("Promise timed out in " + time + "ms");
    }, time);
  });
  return Promise.race([promise, timeout]);
};

const rpcClient = createRpcClient(socketService.create());
const service = stockService(rpcClient);

export const Rig = () => {
  useEffect(() => {
    service
      .getNews("AAPL")
      .then(console.log)
      .catch(console.log);
    // service
    //   .getCompanyOverview("AAPL")
    //   .then(data => console.log("Overview " + data))
    //   .catch(console.log);
    // service
    //   .getChartData("AAPL", "1Y")
    //   .then(data => console.log("Chart " + data))
    //   .catch(console.log);
    // service
    //   .getSuggestions("AA")
    //   .then(data => console.log("Suggestions " + data))
    //   .catch(console.log);
    // service
    //   .getPeersData("AAPL")
    //   .then(data => console.log("Peers " + data))
    //   .catch(console.log);
    // service
    //   .getKeyStats("AAPL")
    //   .then(data => console.log("KeyStats " + data))
    //   .catch(console.log);
    // timeoutPromise2(
    //   2000,
    //   service
    //     .getPeersData("AAPL")
    //     .then(data => console.log("Peers " + data))
    //     .catch(console.log)
    // )
    //   .then(console.log)
    //   .catch(console.log);
  }, []);
  return <div>HELLO WORLD</div>;
};
