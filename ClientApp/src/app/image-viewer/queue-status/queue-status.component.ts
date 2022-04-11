import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadQueueStatus } from '../state/image-viewer.actions';
import { selectIsLoading, selectQueueStatus } from '../state/image-viewer.selectors';
import { QueueStatus } from './queue-status.models';

@Component({
  selector: 'app-queue-status',
  templateUrl: './queue-status.component.html',
  styleUrls: ['./queue-status.component.scss']
})
export class QueueStatusComponent {
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  QueueStatus$: Observable<QueueStatus | undefined> = this.store.select(selectQueueStatus)

  constructor(private store: Store) { }

  checkQueueStatus() {
    this.store.dispatch(loadQueueStatus());
  }

}
