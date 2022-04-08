import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { PiStatusComponent } from './pi-status/pi-status.component';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';

const routes: Routes = [
  { path: '', component: RequestNewImageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'pi-status', component: PiStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageViewerRoutingModule { }
