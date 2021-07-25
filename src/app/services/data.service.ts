import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as internal from 'stream';

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
  getStockValuePredict(year: number, month: number,season: number, stockId: number, peRatio: number)
  {
    const queryURL = url + 'PredictValue';
      const query = {
      year: year,
      month: month,
      season: season,
      companyId: stockId,
      peRatio: peRatio,
    
    };
    return this.http.post<ValuePredict>(queryURL, query);
  }
  // getSOOutputProductivity(startDate, endDate) {
  //   const qURL = `${apiURL}/WorkHourEfficiency/SOOutputProductivity`;
  //   const params = new HttpParams().set('Start', startDate).set('End', endDate);
  //   return this.http.get<SOOutputProductivity[]>(qURL, { params });
  // }

  // getSOWorkHourEfficiency(startDate, endDate) {
  //   const qURL = `${apiURL}/WorkHourEfficiency/SOEfficiency`;
  //   const params = new HttpParams().set('Start', startDate).set('End', endDate);
  //   return this.http.get<SOEfficiency[]>(qURL, { params });
  // }
}
export interface MonthRevenue {}

export interface ValuePredict {
  
  stockInfo : StockApiParaModel,
  peRatioList : PeRatioListModel,
  predictSeasonMarginProfit :  number,
  predictTotalProfitAfterTax :  number,
  predictYearEPS :  number,
   
}
export interface StockApiParaModel{
  stockId : number,
  stockName : string,
  year : number,
  month : number,
  season : number
}
export interface PeRatioListModel{
    //產業本益比
    industryPeRatio : number,
    //法人本益比
    legalPeRatio : number,
    //歷史計算本益比
    historyPeRatio : number
}