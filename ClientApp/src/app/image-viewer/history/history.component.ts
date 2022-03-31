import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GarageImage } from '../image.models';
import { loadHistory } from '../state/image-viewer.actions';
import { selectHistory } from '../state/image-viewer.selectors';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history$: Observable<GarageImage[]> = this.store.select(selectHistory);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadHistory());
  }

  saveImage() {
    // TODO
  }

}
