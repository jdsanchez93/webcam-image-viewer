import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { updateWebcamSettings } from '../../state/image-viewer.actions';
import { initialState } from '../../state/image-viewer.reducer';
import { selectWebcamSettings } from '../../state/image-viewer.selectors';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss', '../settings.scss']
})
export class WebcamSettingsComponent implements OnInit {
  webcamSettingsForm: FormGroup = this.fb.group({
    brightness: new FormControl(),
    contrast: new FormControl()
  });

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
  }

}
