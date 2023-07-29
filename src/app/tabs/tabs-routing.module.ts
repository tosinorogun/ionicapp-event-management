import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'scan',
        loadChildren: () => import('../pages/scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../pages/setting/setting.module').then( m => m.SettingPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
