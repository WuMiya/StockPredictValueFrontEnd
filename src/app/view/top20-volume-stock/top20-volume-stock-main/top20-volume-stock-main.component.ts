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
        const keys = resp.payLoad.fields;
        resp.payLoad.data.forEach((d, idx: number) => {
          const obj = {} as Top20VloumeStockInfo;
          d.forEach((value: any, i: number) => {
            _.set(obj, keys[i], value);
            result[idx] = obj;
          });
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
