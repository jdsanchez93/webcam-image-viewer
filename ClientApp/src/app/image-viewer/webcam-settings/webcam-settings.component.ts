import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { updateWebcamSettings } from '../state/image-viewer.actions';
import { selectWebcamSettings } from '../state/image-viewer.selectors';
import { WebcamSettings } from './webcam-settings.model';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss']
})
export class WebcamSettingsComponent implements OnInit {
  settingsForm: FormGroup = this.fb.group({
    brightness: new FormControl()
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
  }

  save() {
    let ret = Object.fromEntries(Object.entries(this.settingsForm.value).filter(([_, v]) => v != null));
    this.store.dispatch(updateWebcamSettings({ webcamSettings: ret }))
  }

  reset() {
    this.settingsForm.reset();
    this.save();
  }

}
