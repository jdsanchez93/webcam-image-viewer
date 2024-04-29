import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadNewImage } from '../state/image-viewer.actions';
import { selectCurrentPresignedUrl, selectIsLoading } from '../state/image-viewer.selectors';
import { SmartLightSettings, WebcamSettings } from '../settings/settings.models';

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
    let webcamSettings: WebcamSettings = {
      brightness: 100,
      contrast: 32
    };
    let lightSettings: SmartLightSettings = {
      isOn: false
    }
    let isDeleteLastImage = false;

    //        isDeleteLastImage: (state.currentImage.garageImageId === 0 ? true : state.isDeleteLastImage),

    this.store.dispatch(loadNewImage({ webcamSettings, lightSettings, isDeleteLastImage }));
  }

}
