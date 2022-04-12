import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-webcam-settings',
  templateUrl: './webcam-settings.component.html',
  styleUrls: ['./webcam-settings.component.scss']
})
export class WebcamSettingsComponent {
  settingsForm: FormGroup = this.fb.group({
    brightness: new FormControl()
  });

  constructor(private fb: FormBuilder) { }

  save() {
    let ret = Object.fromEntries(Object.entries(this.settingsForm.value).filter(([_, v]) => v != null));
    console.log(ret);
  }

  reset() {
    this.settingsForm.reset();
    this.save();
  }

}
