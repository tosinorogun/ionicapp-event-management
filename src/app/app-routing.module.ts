import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./pages/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./pages/guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'add-events',
    loadChildren: () => import('./pages/add-events/add-events.module').then( m => m.AddEventsPageModule)
  },
  {
    path: 'update-events/:id',
    loadChildren: () => import('./pages/update-events/update-events.module').then( m => m.UpdateEventsPageModule)
  },
  {
    path: 'view-events/:id',
    loadChildren: () => import('./pages/view-events/view-events.module').then( m => m.ViewEventsPageModule)
  },
  {
    path: 'update-guest/:id',
    loadChildren: () => import('./pages/update-guest/update-guest.module').then( m => m.UpdateGuestPageModule)
  },
  {
    path: 'add-guest',
    loadChildren: () => import('./pages/add-guest/add-guest.module').then( m => m.AddGuestPageModule)
  },
  {
    path: 'scan-result',
    loadChildren: () => import('./pages/scan-result/scan-result.module').then( m => m.ScanResultPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./auth/logout/logout.module').then( m => m.LogoutPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
