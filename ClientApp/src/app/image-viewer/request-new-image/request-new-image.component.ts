import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { loadNewImage } from '../state/image-viewer.actions';
import { selectCurrentImage, selectCurrentPresignedUrl, selectIsLoading } from '../state/image-viewer.selectors';
import { GarageImage } from '../image.models';

@Component({
  selector: 'app-request-new-image',
  templateUrl: './request-new-image.component.html',
  styleUrls: ['./request-new-image.component.scss']
})
export class RequestNewImageComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  presignedUrl$ = this.store.select(selectCurrentPresignedUrl);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  requestNewImage() {
    this.store.dispatch(loadNewImage());
  }

}
