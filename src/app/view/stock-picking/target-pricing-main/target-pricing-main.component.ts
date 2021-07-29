import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DataService,
  StockApiParaModel,
  StockInfoModel,
} from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-target-pricing-main',
  templateUrl: './target-pricing-main.component.html',
  styleUrls: ['./target-pricing-main.component.scss'],
})
export class TargetPricingMainComponent implements OnInit, OnDestroy {
  stockList = [{ index: 0, name: '', value: 0 }];
  stockName = '';
  companyId = 0;
  peRatio = 0;
  predictValue = 0;
  idNameList = [{ label: '', value: {} as StockInfoModel }];
  selectedStock = {} as StockInfoModel;
  historyPeRatio = 0;
  predictYearEPS = 0;
  loading = false;
  selectedPeRatioType = '歷史本益比';
  customizePeRatio = 0;
  toolTips = '';

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.getStockIdName();
    this.stockList.shift();
  }

  getStockIdName() {
    this.dataSvc.getStockIdName().subscribe(
      (res) => {
        this.idNameList = res.payLoad.map((x) => ({
          label: x.stockId + ' ' + x.stockName,
          // value: x.stockId,
          searchKey: x.stockId + x.stockName,
          value: {
            stockId: x.stockId,
            stockName: x.stockName,
            stockType: x.stockType,
          },
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getYearSeason() {
    let year = moment().year() - 1911;
    const month = moment().month() + 1; // jan = 0, dec = 11

    let season = Math.floor(month / 3) - 1;
    if (season === 0) {
      year = year - 1;
      season = 4;
    }
    return { year: year, season: season };
  }

  onUpdateStock(e: any) {
    this.selectedStock = e.value;
    this.loading = true;
    const year = this.getYearSeason().year;
    const month = moment().month(); // jan = 0, dec = 11
    const season = this.getYearSeason().season;

    const para = {
      year: year,
      month: month,
      season: season,
      stockInfo: this.selectedStock,
    } as StockApiParaModel;

    this.dataSvc.getStockValuePredict(para).subscribe(
      (res) => {
        this.loading = false;
        const payLoad = res.payLoad;
        this.historyPeRatio = payLoad.peRatioList.historyPeRatio;
        this.predictYearEPS = payLoad.predictYearEPS;
        this.query();
        this.setRecordTable();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  updateCustomizePeRatio() {
    this.selectedPeRatioType === '自訂本益比';
    this.query();
  }

  query() {
    this.predictValue = 0;
    this.toolTips = `預估年EPS * ${this.selectedPeRatioType}`;

    switch (this.selectedPeRatioType) {
      case '歷史本益比':
        this.predictValue = this.historyPeRatio * this.predictYearEPS;
        break;
      case '法人本益比':
        this.predictValue = this.historyPeRatio * this.predictYearEPS;
        break;
      case '自訂本益比':
        this.predictValue = this.customizePeRatio * this.predictYearEPS;
        break;
    }
    if (this.predictValue < 0) {
      this.predictValue = 0;
    }
  }

  setRecordTable() {
    let idx = -1;
    if (this.selectedStock.stockName) {
      idx = this.stockList.findIndex(
        (x) => x.name === this.selectedStock.stockName
      );
      if (idx !== -1) {
        this.stockList[idx].index = idx;
        this.stockList[idx].name = this.selectedStock.stockName;
        this.stockList[idx].value = this.predictValue;
      } else {
        this.stockList = this.stockList.concat({
          index: this.stockList.length,
          name: this.selectedStock.stockName,
          value: this.predictValue,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.stockList = [];
  }

  // handleStockKeyIn(e: any) {
  //   var list: string[] = [''];
  //   list.pop();
  //   this.idNameList.forEach((element) => {
  //     let temp = element.stockId;
  //     for (var i = 0; i < 4; i++) {
  //       var r = temp / this.companyId;
  //       if (r == 1) {
  //         //this.searchList.push(element);

  //         console.log('Search: ' + element.stockId + ' ' + element.stockName);
  //       } else if (r < 1) {
  //         break;
  //       }

  //       temp = Math.floor(temp / 10);
  //     }
  //   });
  //var SelectCtrl = function($scope: { Name: string[]; }) {
  //$scope.Name = list;
  // }
}
