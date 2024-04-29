import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss', '../settings.scss']
})
export class WebcamSettingsComponent implements OnInit {
  webcamSettingsForm: UntypedFormGroup = this.fb.group({
    brightness: new UntypedFormControl(),
    contrast: new UntypedFormControl()
  });

  constructor(private fb: UntypedFormBuilder, private store: Store) { }

  ngOnInit(): void {
  }

  reset() {
    // this.webcamSettingsForm.reset(initialState.webcamSettings, { emitEvent: true });
  }

}
