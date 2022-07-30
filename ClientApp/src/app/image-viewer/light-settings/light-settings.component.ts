import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { updateLightSettings } from '../state/image-viewer.actions';
import { initialState } from '../state/image-viewer.reducer';

@Component({
  selector: 'app-light-settings',
  templateUrl: './light-settings.component.html',
  styleUrls: ['./light-settings.component.scss']
})
export class LightSettingsComponent implements OnInit {

  lightSettingsForm: FormGroup = this.fb.group({
    isOn: new FormControl()
  });

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.lightSettingsForm.valueChanges
      .pipe(
        tap(x => this.store.dispatch(updateLightSettings({ lightSettings: x })))
      )
      .subscribe();
  }

  reset() {
    this.lightSettingsForm.reset(initialState.lightSettings, { emitEvent: false });
    this.store.dispatch(updateLightSettings({lightSettings: undefined}));
  }

}
