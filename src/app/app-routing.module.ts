import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetPricingViewComponent } from './view/stock-picking/target-pricing-view/target-pricing-view.component';

const routes: Routes = [
  // { path: 'leek-army', component: TargetPricingViewComponent },
  {
    path: 'leek-army',
    loadChildren: () =>
      import('./view/stock-picking/stock-picking.module').then(
        (m) => m.StockPickingModule
      ),
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
