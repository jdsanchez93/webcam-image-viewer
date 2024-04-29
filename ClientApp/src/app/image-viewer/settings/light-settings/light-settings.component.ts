import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { initialState } from '../../state/image-viewer.reducer';

@Component({
  selector: 'app-light-settings',
  templateUrl: './light-settings.component.html',
  styleUrls: ['./light-settings.component.scss', '../settings.scss']
})
export class LightSettingsComponent implements OnInit {

  lightSettingsForm: UntypedFormGroup = this.fb.group({
    isOn: new UntypedFormControl()
  });

  constructor(private fb: UntypedFormBuilder, private store: Store) { }

  ngOnInit(): void {
  }

  reset() {
    // this.lightSettingsForm.reset(initialState.lightSettings, { emitEvent: false });
    // this.store.dispatch(updateLightSettings({lightSettings: undefined}));
  }

}
