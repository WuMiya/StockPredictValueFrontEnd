import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetPricingMainComponent } from './target-pricing-main/target-pricing-main.component';
import { TargetPricingViewComponent } from './target-pricing-view/target-pricing-view.component';

const routes: Routes = [
  {
    path: 'stocking-pricing',
    component: TargetPricingViewComponent,
    children: [
      {
        path: 'target-price',
        component: TargetPricingMainComponent,
      },
      // {
      //   path: 'productivity',
      //   component: ProductivityMainComponent,
      // },
      // {
      //   path: 'inboundQty',
      //   component: InboundQtyMainComponent,
      // },
      // {
      //   path: 'final-yield-rate',
      //   component: FinalYieldRateComponent,
      // },
      // {
      //   path: 'scrap-cost',
      //   component: ScrapCostComponent,
      // },
      // {
      //   path: 'afr6-info',
      //   component: Afr6InfoComponent,
      // },
      // {
      //   path: 'issue',
      //   component: IssueTrackingComponent,
      // },
      // {
      //   path: 'issue-overview',
      //   component: IssueOverviewMainComponent,
      // },
      { path: '**', redirectTo: 'target-price' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockPickingRoutingModule {}
