import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';

const routes: Routes = [
  { path: '', component: RequestNewImageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageViewerRoutingModule { }
