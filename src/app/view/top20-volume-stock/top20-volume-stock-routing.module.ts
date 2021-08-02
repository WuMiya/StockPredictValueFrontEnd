import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Top20VolumeStockMainComponent } from './top20-volume-stock-main/top20-volume-stock-main.component';

const routes: Routes = [
  {
    path: '',
    component: Top20VolumeStockMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top20VolumeStockRoutingModule {}
