import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerRoutingModule } from './image-viewer-routing.module';
import { RequestNewImageComponent } from './request-new-image/request-new-image.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { imageViewerFeatureKey, imageViewerReducer } from './state/image-viewer.reducer';
import { ImageViewerEffects } from './state/image-viewer.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { HistoryComponent } from './history/history.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { QueueStatusComponent } from './queue-status/queue-status.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { AdvancedSettingsComponent } from './settings/advanced-settings/advanced-settings.component';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { ImageSettingsComponent } from './settings/image-settings/image-settings.component';

@NgModule({
  declarations: [
    RequestNewImageComponent,
    HistoryComponent,
    EditorFormComponent,
    QueueStatusComponent,
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
    MatCheckboxModule
  ]
})
export class ImageViewerModule { }
