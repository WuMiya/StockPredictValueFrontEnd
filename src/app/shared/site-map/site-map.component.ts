import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabItem } from 'src/app/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss'],
})
export class SiteMapComponent implements OnInit {
  @Input() tabs: TabItem[] = [];

  constructor(
    private router: Router,
    private translate: TranslateService,
    public navBar: NavBarService
  ) {}

  ngOnInit() {
    if (this.router.url.indexOf('/mobile/') > -1) {
      this.navBar.hideNavbar();
    } else {
      this.navBar.showNavbar();
    }
  }

  ngOnDestroy() {
    this.navBar.hideNavbar();
  }

  onLogin() {
    // this.authService.loginByAD((result) => {
    //   // console.log(result);
    // });
  }

  onLogout() {
    // this.authService.logout((result) => {
    //   console.log('已登出');
    // });
    if (_.includes(this.router.url, 'stock-picking')) {
      this.router.navigate(['/stock-picking']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
