import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { QueueStatusComponent } from './queue-status/queue-status.component';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';

const routes: Routes = [
  { path: '', component: RequestNewImageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'status', component: QueueStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageViewerRoutingModule { }
