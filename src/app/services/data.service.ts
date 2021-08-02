import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getStockValuePredict(info: StockApiParaModel) {
    const queryURL = url + 'PredictValueInfo';
    const query = {
      year: info.year,
      month: info.month,
      season: info.season,
      stockInfo: info.stockInfo,
    };
    return this.http.post<Resp<ValuePredict>>(queryURL, query);
  }
  getStockIdName() {
    const queryURL = url + 'GetStockInfo';
    return this.http.get<Resp<StockInfoModel[]>>(queryURL);
  }

  getTop20VolumeStocks(date: string) {
    const queryURL =
      'https://www.twse.com.tw/exchangeReport/MI_INDEX20?response=json&date=20210802&_=1627912158345';
    // const params = new HttpParams().set('date', date).set('_', 1627912158345);
    // const params = new HttpParams().set('date', date);
    return this.http.get<Top20VloumeStockInfo>(queryURL);
    // return this.http.get<Top20VloumeStockInfo>(queryURL, { params });
  }
}
export interface MonthRevenue {}

export interface ValuePredict {
  stockPara: StockApiParaModel;
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
  data: any[];
  date: string;
  fields: string[];
  notes: string[];
}
