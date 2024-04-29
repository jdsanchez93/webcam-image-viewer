import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LightSettingsComponent } from '../light-settings/light-settings.component';
import { WebcamSettingsComponent } from '../webcam-settings/webcam-settings.component';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WebcamSettings } from '../settings.models';

@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.scss', '../settings.scss']
})
export class AdvancedSettingsComponent implements OnInit {

  // @ViewChild(WebcamSettingsComponent) webcamSettingsComponent!: WebcamSettingsComponent;
  // @ViewChild(LightSettingsComponent) lightSettingsComponent!: LightSettingsComponent;


  // @Input() brightness!: number;
  // @Input() contrast!: number;

  initialWebcamSettings: WebcamSettings = {
    brightness: 100,
    contrast: 32
  };

  constructor(private store: Store, private fb: FormBuilder) { }

  advancedSettingsForm = this.fb.group({
    webcamSettings: new FormGroup({
      brightness: new FormControl(100, { nonNullable: true }),
      contrast: new FormControl(32, { nonNullable: true }),
    }),
    lightSettings: this.fb.group({
      isOn: new FormControl(false, { nonNullable: true }),
    }),
    isDeleteLastImage: new FormControl(false, { nonNullable: true })
  });


  ngOnInit(): void {
  }


  reset() {
    // this.webcamSettingsComponent.reset();
    // this.lightSettingsComponent.reset();
  }

}
