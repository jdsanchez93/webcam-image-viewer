import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditorFormComponent } from '../editor-form/editor-form.component';
import { GarageImage } from '../image.models';
import { loadHistory, updateImage } from '../state/image-viewer.actions';
import { selectHistory } from '../state/image-viewer.selectors';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history$: Observable<GarageImage[]> = this.store.select(selectHistory);
  @ViewChildren(EditorFormComponent) viewChildren!: QueryList<EditorFormComponent>;
  step: number = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadHistory());
  }

  saveImage(garageImageId: number) {
    let partialGarageImage = this.viewChildren.find(x => x.garageImage.garageImageId === garageImageId)?.getFormData();
    if (partialGarageImage !== undefined) {
      this.store.dispatch(updateImage({ garageImageId: garageImageId, partialImage: partialGarageImage }));
    }
  }

  setStep(index: number) {
    this.step = index;
  }

}
