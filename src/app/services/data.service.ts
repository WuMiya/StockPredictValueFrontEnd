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
    // const params = new HttpParams().set('date', date).set('_', 1627912158345);
    // const params = new HttpParams().set('date', date);
    return this.http.get<Resp<Top20VloumeStockResp>>(queryURL);
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

export interface Top20VloumeStockResp {
  data: any[];
  date: string;
  fields: string[];
  notes: string[];
}

export interface Top20VloumeStockInfo {
  排名: string;
  證券代號: string;
  證券名稱: string;
  成交股數: string;
  成交筆數: string;
  開盤價: string;
  最高價: string;
  最低價: string;
  收盤價: string;
  '漲跌(+/-)': string;
  漲跌價差: string;
  最後揭示買價: string;
  最後揭示賣價: string;
}
export interface Hearder {
  field: string;
  header: string;
  style: {};
}

const KEYS = {
  0: '排名',
  1: '證券代號',
  2: '證券名稱',
  3: '成交股數',
  4: '成交筆數',
  5: '開盤價',
  6: '最高價',
  7: '最低價',
  8: '收盤價',
  9: '漲跌(+/-)',
  10: '漲跌價差',
  11: '最後揭示買價',
  12: '最後揭示賣價',
};
