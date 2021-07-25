import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TabItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-target-pricing-view',
  templateUrl: './target-pricing-view.component.html',
  styleUrls: ['./target-pricing-view.component.scss'],
})
export class TargetPricingViewComponent implements OnInit {
  tabs: TabItem[] = [];

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.tabs = this.getMenuItems();
    });
  }

  ngOnInit() {
    this.tabs = this.getMenuItems();
  }

  getMenuItems() {
    return [
      {
        name: '策略選股',
        iconClass: '',
        link: '',
        nested: [
          {
            name: '目標價選股',
            iconClass: '',
            link: '/leek-army/stock-picking/target-price',
          },
          {
            name: '短線綜合選股',
            iconClass: '',
            link: '/leek-army/stock-picking/short-term-mix',
          },
        ],
      },
      {
        name: '歷史資料',
        iconClass: '',
        link: '/leek-army/history-record',
      },
    ];
  }
}
