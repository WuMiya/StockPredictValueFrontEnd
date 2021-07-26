import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService, StockInfoModel } from 'src/app/services/data.service';
import * as moment from 'moment';
import { List } from 'lodash';

@Component({
  selector: 'app-target-pricing-main',
  templateUrl: './target-pricing-main.component.html',
  styleUrls: ['./target-pricing-main.component.scss'],
})
export class TargetPricingMainComponent implements OnInit {
  stockList = [
    { index: 3552, name: '同致', value: 252 },
    { index: 2330, name: '台積電', value: 589 },
  ];
  stockName = "";
  companyId = 0;
  peRatio = 0;
  predictValue = 0;
  idNameList:StockInfoModel[] = []; 
  selectedStock: StockInfoModel | undefined;
  constructor(private dataSvc: DataService) {
     this.dataSvc
      .getStockIdName().subscribe(
        (res) => {
            this.idNameList = res.payLoad;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    console.log('run');
  }

  handleClick(e: any) {
    console.log(e);

    let year = moment().year() - 1911;
    let month = moment().month();
    let season = 1;

    this.dataSvc
      .getStockValuePredict(
        year,
        month,
        season,
        Number(this.selectedStock?.stockId),
        Number(this.peRatio)
      )
      .subscribe(
        (res) => {
            const tmp = res.payLoad;
            console.log(tmp);
            this.predictValue = tmp.peRatioList.historyPeRatio * tmp.predictYearEPS;
        },
        (error) => {
          console.log(error);
        }
      );

    //execute action
  }

  handleStockKeyIn(e: any){
    var list : string[] =[''];
    list.pop();
     this.idNameList.forEach(element => {
        let temp  = element.stockId;
        for (var i = 0; i < 4; i ++) 
        {
          var r = (temp / this.companyId);
          if(r == 1)
          {
              //this.searchList.push(element);

             console.log("Search: "+element.stockId+" "+element.stockName);
          }
          else if(r < 1)
          {
            break;
          }

          temp = Math.floor(temp/10); 
        }
    });
    //var SelectCtrl = function($scope: { Name: string[]; }) {
	  //$scope.Name = list;
  
  }


}
