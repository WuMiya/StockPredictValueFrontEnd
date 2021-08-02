import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TabItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-site-map-view',
  templateUrl: './site-map-view.component.html',
  styleUrls: ['./site-map-view.component.scss'],
})
export class SiteMapViewComponent implements OnInit {
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
        name: '當日動能爆量股',
        iconClass: '',
        link: '/top20-volume-stock',
      },
      {
        name: '策略選股',
        iconClass: '',
        link: '',
        nested: [
          {
            name: '目標價選股',
            iconClass: '',
            link: '/stock-picking/target-price',
          },
          {
            name: '短線綜合選股',
            iconClass: '',
            link: '/stock-picking/short-term-mix',
          },
        ],
      },
      {
        name: '歷史資料',
        iconClass: '',
        link: '/history-record',
      },
    ];
  }
}
