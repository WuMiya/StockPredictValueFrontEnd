import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Top20VolumeStockRoutingModule } from './top20-volume-stock-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Top20VolumeStockMainComponent } from './top20-volume-stock-main/top20-volume-stock-main.component';

@NgModule({
  declarations: [Top20VolumeStockMainComponent],
  imports: [CommonModule, SharedModule, Top20VolumeStockRoutingModule],
})
export class Top20VolumeStockModule {}
