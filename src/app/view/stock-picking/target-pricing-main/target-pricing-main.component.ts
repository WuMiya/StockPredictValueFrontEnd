import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService, StockInfoModel } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-target-pricing-main',
  templateUrl: './target-pricing-main.component.html',
  styleUrls: ['./target-pricing-main.component.scss'],
})
export class TargetPricingMainComponent implements OnInit, OnDestroy {
  stockList = [
    { index: 0, name: '', value: 0 },
    // { index: 3552, name: '同致', value: 252 },
    // { index: 2330, name: '台積電', value: 589 },
  ];
  stockName = '';
  companyId = 0;
  peRatio = 0;
  predictValue = 0;
  idNameList = [{ label: '', value: {} as StockInfoModel }];
  selectedStock = {} as StockInfoModel;
  historyPeRatio = 0;
  predictYearEPS = 0;
  loading = false;

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
          value: { stockId: x.stockId, stockName: x.stockName },
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleClick() {
    this.loading = true;
    const year = moment().year() - 1911;
    const month = moment().month();
    const season = 1;

    this.dataSvc
      .getStockValuePredict(
        year,
        month,
        season,
        this.selectedStock.stockId,
        this.peRatio
      )
      .subscribe(
        (res) => {
          this.loading = false;
          const tmp = res.payLoad;
          this.historyPeRatio = tmp.peRatioList.historyPeRatio;
          this.predictYearEPS = tmp.predictYearEPS;
          const value = this.historyPeRatio * tmp.predictYearEPS;
          this.predictValue = value && value > 0 ? value : 0;
          this.setRecordTable();
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );

    //execute action
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
