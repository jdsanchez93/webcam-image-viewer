import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs';
import { LightSettingsComponent } from '../light-settings/light-settings.component';
import { updateLightSettings, updateWebcamSettings } from '../../state/image-viewer.actions';
import { initialState } from '../../state/image-viewer.reducer';
import { selectLightSettings, selectWebcamSettings } from '../../state/image-viewer.selectors';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss']
})
export class WebcamSettingsComponent implements OnInit {
  webcamSettingsForm: FormGroup = this.fb.group({
    brightness: new FormControl(),
    contrast: new FormControl()
  });

  @ViewChild(LightSettingsComponent) lightSettingsComponent!: LightSettingsComponent;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectWebcamSettings)
      .pipe(
        take(1),
        tap(x => this.webcamSettingsForm.setValue(x))
      )
      .subscribe();

    this.webcamSettingsForm.valueChanges
      .pipe(
        tap(x => this.store.dispatch(updateWebcamSettings({ webcamSettings: x })))
      )
      .subscribe();
  }

  reset() {
    this.webcamSettingsForm.reset(initialState.webcamSettings, { emitEvent: true });
    this.lightSettingsComponent.reset();
  }

}
