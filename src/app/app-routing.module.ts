import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteMapViewComponent } from './shared/site-map-view/site-map-view.component';

const routes: Routes = [
  { path: 'sitemap', component: SiteMapViewComponent },
  {
    path: 'stock-picking',
    loadChildren: () =>
      import('./view/stock-picking/stock-picking.module').then(
        (m) => m.StockPickingModule
      ),
  },
  {
    path: 'top20-volume-stock',
    loadChildren: () =>
      import('./view/top20-volume-stock/top20-volume-stock.module').then(
        (m) => m.Top20VolumeStockModule
      ),
  },
  { path: '**', redirectTo: '/sitemap' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
