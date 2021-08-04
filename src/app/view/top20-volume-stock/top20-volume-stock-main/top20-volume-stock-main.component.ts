import { Component, OnInit } from '@angular/core';
import {
  DataService,
  Hearder,
  Top20VloumeStockInfo,
} from 'src/app/services/data.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/zh-tw';

@Component({
  selector: 'app-top20-volume-stock-main',
  templateUrl: './top20-volume-stock-main.component.html',
  styleUrls: ['./top20-volume-stock-main.component.scss'],
})
export class Top20VolumeStockMainComponent implements OnInit {
  top20VolumeStocks: Top20VloumeStockInfo[] = [];
  loading = false;
  date = '';
  headers: Hearder[] = [];

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    moment.locale('zh-tw');
    this.date = moment().format('LL');

    this.getTop20VolumeStocks();
  }

  getTop20VolumeStocks() {
    // const date = moment().format('YYYYMMDD');
    this.loading = true;
    const result: Top20VloumeStockInfo[] = [];
    this.dataSvc.getTop20VolumeStocks().subscribe(
      (resp) => {
        const keys = ["排名", "證券代號", "證券名稱", "成交股數", "成交筆數", "開盤價", "最高價", "最低價", "收盤價", "漲跌(+/-)", "漲跌價差", "最後揭示買價","最後揭示賣價"];

        resp.payLoad.forEach((d, idx: number) => {
          const obj = {} as Top20VloumeStockInfo;
          _.set(obj, keys[0], d.rank);
          _.set(obj, keys[1], d.companyId);
          _.set(obj, keys[2], d.companyName);
          _.set(obj, keys[3], d.transactionShares);
          _.set(obj, keys[4], d.transactionAmount);
          _.set(obj, keys[5], d.openingPrice);
          _.set(obj, keys[6], d.highestPrice);
          _.set(obj, keys[7], d.lowestPrice);
          _.set(obj, keys[8], d.closingPrice);
          _.set(obj, keys[9], d.upsDowns);
          _.set(obj, keys[10], d.priceDifference);
          _.set(obj, keys[11], d.lastRevealBuyPrice);
          _.set(obj, keys[12], d.lastRevealSealPrice);
        
          /*d.forEach((value: any, i: number) => {
            _.set(obj, keys[i], value);
            result[idx] = obj;
          });*/
          result[idx] = obj;
        });
        this.top20VolumeStocks = result;
        keys.forEach((k) => {
          this.headers.push({
            field: k,
            header: k,
            style: k === '排名' ? { width: '4%' } : { width: '8%' },
          });
        });
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
