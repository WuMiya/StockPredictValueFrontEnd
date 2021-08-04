import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getMonthRevenueInfo(year: number, month: number, stockId: number) {
    const queryURL = url + 'MonthlyRevenue';
    const query = {
      year: year,
      month: month,
      stockId: stockId,
    };
    return this.http.post<Resp<MonthRevenue>>(queryURL, query);
  }

  getStockValuePredict(info: StockApiParaModel) {
    const queryURL = url + 'PredictValueInfo';
    const query = {
      year: info.year,
      month: info.month,
      season: info.season,
      stockInfo: info.stockInfo,
    };
    return this.http.post<Resp<MonthRevenue>>(queryURL, query);
  }
  getStockIdName() {
    const queryURL = url + 'GetStockInfo';
    return this.http.get<Resp<StockInfoModel[]>>(queryURL);
  }

  getTop20VolumeStocks() {
    const queryURL = url + 'Get20TopTradingAmountStocks';
    return this.http.get<Resp<Top20VloumeStockInfo[]>>(queryURL);
  }

  // getTop20VolumeStocks(date: string): Observable<any> {
  // return from(
  //   fetch(
  //     `https://www.twse.com.tw/exchangeReport/MI_INDEX20?response=json&date=${date}`,
  //     {
  //       headers: {
  //         accept: '*/*',
  //         'sec-fetch-dest': 'empty',
  //         'sec-fetch-mode': 'no-cors',
  //       },
  //       method: 'GET',
  //       mode: 'no-cors',
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  // );

  //}
}
export interface MonthRevenue {
  peRatioList: peRatioListInfo;
  predictSeasonMarginProfit: number;
  predictTotalProfitAfterTax: number;
  predictYearEPS: number;
}

export interface peRatioListInfo {
  historyPeRatio: number;
  industryPeRatio: number;
  legalPeRatio: number;
}

export interface TabItem {
  name: string;
  iconClass: string;
  link?: string;
  href?: string;
  nested?: TabItem[];
}

export interface Resp<T> {
  succ: boolean;
  code: number;
  message: string;
  dataTime: string;
  payLoad: T;
}

export interface StockApiParaModel {
  stockInfo: StockInfoModel;
  year: number;
  month: number;
  season: number;
}

export interface PeRatioListModel {
  industryPeRatio: number;
  legalPeRatio: number;
  historyPeRatio: number;
}

export interface StockInfoModel {
  stockId: number;
  stockName: string;
  stockType: string;
}

export interface Top20VloumeStockInfo {
  closingPrice: number;
  companyId: string;
  companyName: string;
  highestPrice: number;
  lastRevealBuyPrice: number;
  lastRevealSealPrice: number;
  lowestPrice: number;
  openingPrice: number;
  priceDifference: number;
  rank: number;
  transactionAmount: number;
  transactionShares: number;
  upsDowns: string;
}

export interface Hearder {
  field: string;
  header: string;
  style: {};
}
