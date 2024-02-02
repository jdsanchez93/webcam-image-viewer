import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { updateIsDeleteLastImage } from '../../state/image-viewer.actions';
import { selectIsDeleteLastImage } from '../../state/image-viewer.selectors';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss']
})
export class ImageSettingsComponent implements OnInit {
  checked: boolean = true;

  imageSettingsFormGroup: FormGroup = this.fb.group({
    isDeleteLastImage: new FormControl(false)
  })

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectIsDeleteLastImage)
      .pipe(
        take(1),
        tap(x => this.imageSettingsFormGroup.setValue({ isDeleteLastImage: x }))
      )
      .subscribe();

    this.imageSettingsFormGroup.valueChanges
      .pipe(
        tap(x => this.store.dispatch(updateIsDeleteLastImage({ isDeleteLastImage: x.isDeleteLastImage })))
      )
      .subscribe();
  }

}
