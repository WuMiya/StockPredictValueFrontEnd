import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  isShowNavbar = false;
  showNavbar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  showNavbar() {
    this.isShowNavbar = true;
    this.showNavbar$.next(this.isShowNavbar);
  }

  hideNavbar() {
    this.isShowNavbar = false;
    this.showNavbar$.next(this.isShowNavbar);
  }
}
