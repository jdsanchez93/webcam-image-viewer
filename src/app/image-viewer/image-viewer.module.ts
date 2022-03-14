import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerRoutingModule } from './image-viewer-routing.module';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';


@NgModule({
  declarations: [
    RequestNewImageComponent
  ],
  imports: [
    CommonModule,
    ImageViewerRoutingModule
  ]
})
export class ImageViewerModule { }
