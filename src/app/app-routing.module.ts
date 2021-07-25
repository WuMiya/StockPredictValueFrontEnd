import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'leek-army', component: TargetPricingViewComponent },
  {
    path: 'leek-army',
    loadChildren:
      './view/stock-picking/stock-picking.module#StockPickingModule',
  },
  {
    path: '**',
    redirectTo: '/leek-army',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
