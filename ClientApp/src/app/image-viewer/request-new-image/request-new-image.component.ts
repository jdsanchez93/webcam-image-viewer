import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadNewImage } from '../state/image-viewer.actions';
import { selectCurrentPresignedUrl, selectIsLoading } from '../state/image-viewer.selectors';
import { AdvancedSettingsComponent } from '../settings/advanced-settings/advanced-settings.component';

@Component({
  selector: 'app-request-new-image',
  templateUrl: './request-new-image.component.html',
  styleUrls: ['./request-new-image.component.scss']
})
export class RequestNewImageComponent {
  @ViewChild(AdvancedSettingsComponent) advancedSettings!: AdvancedSettingsComponent;

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  presignedUrl$ = this.store.select(selectCurrentPresignedUrl);

  constructor(private store: Store) { }

  requestNewImage() {
    const { webcamSettings, lightSettings } = this.advancedSettings.getFormData();
    this.store.dispatch(loadNewImage({ webcamSettings, lightSettings }));
  }

}
