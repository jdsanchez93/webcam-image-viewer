import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'image-viewer', loadChildren: () => import('./image-viewer/image-viewer.module').then(m => m.ImageViewerModule) },
  { path: 'profile', loadComponent: () => import('./auth/profile/profile.component').then(mod => mod.ProfileComponent) },
  { path: '**', redirectTo: 'image-viewer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
