import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./Authentication/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./order/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./receipts/receipts.module').then( m => m.ReceiptsPageModule)
  },
  {
    path: 'order-guide',
    loadChildren: () => import('./modal/order-guide/order-guide.module').then( m => m.OrderGuidePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./order/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./order/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'orders-history',
    loadChildren: () => import('./order/orders-history/orders-history.module').then( m => m.OrdersHistoryPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'tip',
    loadChildren: () => import('./tip/tip.module').then( m => m.TipPageModule)
  },
  {
    path: 'account-selection',
    loadChildren: () => import('./modal/account-selection/account-selection.module').then( m => m.AccountSelectionPageModule)
  },
  {
    path: 'personal-account',
    loadChildren: () => import('./modal/personal-account/personal-account.module').then( m => m.PersonalAccountPageModule)
  },
  {
    path: 'business-account',
    loadChildren: () => import('./modal/business-account/business-account.module').then( m => m.BusinessAccountPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
