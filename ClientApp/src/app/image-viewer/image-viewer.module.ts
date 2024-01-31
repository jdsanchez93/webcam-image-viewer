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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QueueStatusComponent } from './queue-status/queue-status.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { WebcamSettingsComponent } from './settings/webcam-settings/webcam-settings.component';
import { MatSliderModule } from '@angular/material/slider';
import { LightSettingsComponent } from './settings/light-settings/light-settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdvancedSettingsComponent } from './settings/advanced-settings/advanced-settings.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImageSettingsComponent } from './settings/image-settings/image-settings.component';

@NgModule({
  declarations: [
    RequestNewImageComponent,
    HistoryComponent,
    EditorFormComponent,
    QueueStatusComponent,
    WebcamSettingsComponent,
    LightSettingsComponent,
    AdvancedSettingsComponent,
    ImageSettingsComponent,
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
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class ImageViewerModule { }
