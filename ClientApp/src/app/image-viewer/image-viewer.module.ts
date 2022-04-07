import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerRoutingModule } from './image-viewer-routing.module';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';
import { MatButtonModule } from '@angular/material/button';
import { imageViewerFeatureKey, imageViewerReducer } from './state/image-viewer.reducer';
import { ImageViewerEffects } from './state/image-viewer.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryComponent } from './history/history.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    RequestNewImageComponent,
    HistoryComponent,
    EditorFormComponent
  ],
  imports: [
    CommonModule,
    ImageViewerRoutingModule,
    StoreModule.forFeature(imageViewerFeatureKey, imageViewerReducer),
    EffectsModule.forFeature([ImageViewerEffects]),
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ImageViewerModule { }
