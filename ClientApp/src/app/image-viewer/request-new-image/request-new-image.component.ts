import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { loadNewImage } from '../state/image-viewer.actions';
import { selectCurrentImage, selectIsLoading } from '../state/image-viewer.selectors';
import { GarageImage } from '../image.models';

@Component({
  selector: 'app-request-new-image',
  templateUrl: './request-new-image.component.html',
  styleUrls: ['./request-new-image.component.scss']
})
export class RequestNewImageComponent implements OnInit {
  currentImage$: Observable<GarageImage> = this.store.select(selectCurrentImage);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  requestNewImage() {
    this.store.dispatch(loadNewImage());
  }

}
