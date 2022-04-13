import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs';
import { updateWebcamSettings } from '../state/image-viewer.actions';
import { initialState } from '../state/image-viewer.reducer';
import { selectWebcamSettings } from '../state/image-viewer.selectors';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss']
})
export class WebcamSettingsComponent implements OnInit {
  settingsForm: FormGroup = this.fb.group({
    brightness: new FormControl(),
    contrast: new FormControl()
  });

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectWebcamSettings)
      .pipe(
        take(1),
        map(x => {
          if (x !== undefined) {
            this.settingsForm.setValue(x);
          }
        })
      )
      .subscribe()

    // TODO remove log
    this.settingsForm.valueChanges
      .pipe(
        tap(() => this.save())
      )
      .subscribe(x => console.log('valuechange', x))
  }

  save() {
    let ret = Object.fromEntries(Object.entries(this.settingsForm.value).filter(([_, v]) => v != null));
    this.store.dispatch(updateWebcamSettings({ webcamSettings: ret }))
  }

  reset() {
    // TODO
    this.settingsForm.reset(initialState.webcamSettings);
    this.save();
  }

}
