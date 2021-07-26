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
    return this.http.post<MonthRevenue>(queryURL, query);
  }

  getStockValuePredict(
    year: number,
    month: number,
    season: number,
    stockId: number,
    peRatio: number
  ) {
    const queryURL = url + 'PredictValueInfo';
    const query = {
      year: year,
      month: month,
      season: season,
      stockId: stockId,
      stockName: '',
    };
    return this.http.post<Resp<ValuePredict>>(queryURL, query);
  }
  getStockIdName() {
    const queryURL = url + 'GetStockInfo';
    return this.http.get<Resp<StockInfoModel[]>>(queryURL);
  }
}
export interface MonthRevenue {}

export interface ValuePredict {
  stockInfo: StockApiParaModel;
  peRatioList: PeRatioListModel;
  predictSeasonMarginProfit: number;
  predictTotalProfitAfterTax: number;
  predictYearEPS: number;
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
  stockId: number;
  stockName: string;
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
}
