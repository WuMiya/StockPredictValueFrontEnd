import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

// 3rd party module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { StockPickingModule } from './view/stock-picking/stock-picking.module';
import { StockPickingRoutingModule } from './view/stock-picking/stock-picking-routing.module';

const httpLoaderLeekArmy = (http: HttpClient) => {
  return new TranslateHttpLoader(http, `${environment.apiURL}`, '');
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StockPickingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderLeekArmy,
        deps: [HttpClient],
      },
    }),
    StockPickingRoutingModule,
  ],
  providers: [DatePipe, DecimalPipe, PercentPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
