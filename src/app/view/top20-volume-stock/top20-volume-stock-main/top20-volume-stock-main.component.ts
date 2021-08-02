import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-top20-volume-stock-main',
  templateUrl: './top20-volume-stock-main.component.html',
  styleUrls: ['./top20-volume-stock-main.component.scss'],
})
export class Top20VolumeStockMainComponent implements OnInit {
  top20VolumeStocks: any[] = [];

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.getTop20VolumeStocks();
  }

  getTop20VolumeStocks() {
    const date = moment().format('YYYYMMDD');
    const result: any[] = [];
    this.dataSvc.getTop20VolumeStocks(date).subscribe(
      (resp) => {
        resp.fields.forEach((f, i) => {
          resp.data.forEach((d) => {
            _.set(result[i], f, d);
          });
        });
        console.log(result);
        this.top20VolumeStocks = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
