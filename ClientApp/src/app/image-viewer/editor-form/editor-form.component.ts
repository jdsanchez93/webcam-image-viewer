import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GarageImage } from '../image.models';

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements OnInit{
  imageForm: FormGroup = this.fb.group({
    numberOfCars: new FormControl('', Validators.required)
  });
  @Input() garageImage!: GarageImage;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.garageImage.numberOfCars !== null) {
      this.imageForm.controls['numberOfCars'].setValue(this.garageImage.numberOfCars);
    }
  }

  getFormData(): Partial<GarageImage> | undefined {
    if (this.imageForm.valid) {
      return { numberOfCars: +this.imageForm.controls['numberOfCars'].value };
    }
    return undefined;
  }
}
