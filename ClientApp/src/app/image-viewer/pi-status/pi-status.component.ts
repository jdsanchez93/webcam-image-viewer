import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPiStatus } from '../state/image-viewer.actions';
import { selectIsLoading, selectPiStatus } from '../state/image-viewer.selectors';
import { PiStatus } from './pi-status.models';

@Component({
  selector: 'app-pi-status',
  templateUrl: './pi-status.component.html',
  styleUrls: ['./pi-status.component.scss']
})
export class PiStatusComponent {
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  piStatus$: Observable<PiStatus | undefined> = this.store.select(selectPiStatus)

  constructor(private store: Store) { }

  checkPiStatus() {
    this.store.dispatch(loadPiStatus());
  }

}
