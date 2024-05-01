import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.scss', '../settings.scss']
})
export class AdvancedSettingsComponent {

  constructor(private fb: FormBuilder) { }

  advancedSettingsForm = this.fb.group({
    webcamSettings: this.fb.group({
      brightness: new FormControl(100, { nonNullable: true }),
      contrast: new FormControl(32, { nonNullable: true }),

    }),
    lightSettings: this.fb.group({
      isOn: new FormControl({ value: false, disabled: true }, { nonNullable: true }),
    })
  });

  reset() {
    this.advancedSettingsForm.reset();
  }

  public getFormData() {
    return this.advancedSettingsForm.getRawValue();
  }

}
