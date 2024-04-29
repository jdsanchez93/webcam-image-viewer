import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss']
})
export class ImageSettingsComponent implements OnInit {
  checked: boolean = true;

  imageSettingsFormGroup: UntypedFormGroup = this.fb.group({
    isDeleteLastImage: new UntypedFormControl(false)
  })

  constructor(private fb: UntypedFormBuilder, private store: Store) { }

  ngOnInit(): void {
  }

}
