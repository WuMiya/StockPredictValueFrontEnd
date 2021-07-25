import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetPricingMainComponent } from './target-pricing-main/target-pricing-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataService } from 'src/app/services/data.service';
import { StockPickingRoutingModule } from './stock-picking-routing.module';

@NgModule({
  declarations: [TargetPricingMainComponent],
  imports: [CommonModule, SharedModule, StockPickingRoutingModule],
  providers: [DataService],
})
export class StockPickingModule {}
