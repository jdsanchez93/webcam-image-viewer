import { Component, ViewChild } from '@angular/core';
import { LightSettingsComponent } from '../light-settings/light-settings.component';
import { WebcamSettingsComponent } from '../webcam-settings/webcam-settings.component';

@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.scss', '../settings.scss']
})
export class AdvancedSettingsComponent {

  @ViewChild(WebcamSettingsComponent) webcamSettingsComponent!: WebcamSettingsComponent;
  @ViewChild(LightSettingsComponent) lightSettingsComponent!: LightSettingsComponent;

  constructor() { }

  reset() {
    this.webcamSettingsComponent.reset();
    this.lightSettingsComponent.reset();
  }

}
