import { Component, OnInit } from '@angular/core';
import {
  DataService,
  Hearder,
  Top20VloumeStockInfo,
} from 'src/app/services/data.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/zh-tw';

interface StringKey {
  [key: string]: any;
}

const ChineseColumn: StringKey = {
  rank: '排名',
  companyId: '證券代號',
  companyName: '證券名稱',
  transactionShares: '成交股數',
  transactionAmount: '成交筆數',
  openingPrice: '開盤價',
  highestPrice: '最高價',
  lowestPrice: '最低價',
  closingPrice: '收盤價',
  upsDowns: '漲跌(+/-)',
  priceDifference: '漲跌價差',
  lastRevealBuyPrice: '最後揭示買價',
  lastRevealSealPrice: '最後揭示賣價',
};

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
    this.loading = true;
    const result: any[] = [];
    this.dataSvc.getTop20VolumeStocks().subscribe(
      (resp) => {
        resp.payLoad.forEach((data: StringKey) => {
          if (data.upsDowns === 'up') {
            data.upsDowns = '+';
          } else if (data.upsDowns === 'down') {
            data.upsDowns = '-';
          }
          for (const k in data) {
            const newkey = ChineseColumn[k];
            data[newkey] = data[k];
            delete data[k];
          }
          result.push(data);
        });
        this.top20VolumeStocks = result;
        const keys = Object.values(ChineseColumn);
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

  typeOf(value: any) {
    return typeof value;
  }

  getColor(val: string) {
    switch (val) {
      case '+':
        return 'red';

      case '-':
        return 'green';

      default:
        return 'black';
    }
  }

  getFontWeight(val: string) {
    if (val === '+' || val === '-') {
      return 'bolder';
    } else {
      return 'normal';
    }
  }

  getFontSize(val: string) {
    if (val === '+' || val === '-') {
      return '20px';
    } else {
      return 'small';
    }
  }
}
