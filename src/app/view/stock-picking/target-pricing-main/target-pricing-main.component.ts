import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

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

  companyId = 0;
  peRatio = 0;
  predictValue = 0;
  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    console.log('run');
  }

  handleClick(e: any) {
    console.log(e);

    let year = moment().year() - 1911;
    let month = moment().month() - 1;
    let season = 1;

    this.dataSvc
      .getStockValuePredict(
        year,
        month,
        season,
        Number(this.companyId),
        Number(this.peRatio)
      )
      .subscribe(
        (res) => {
          this.predictValue = res.predictStockValue;
        },
        (error) => {
          console.log(error);
        }
      );

    //execute action
  }
}
