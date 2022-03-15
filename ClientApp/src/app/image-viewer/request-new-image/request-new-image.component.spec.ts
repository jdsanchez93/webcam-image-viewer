import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewImageComponent } from './request-new-image.component';

describe('RequestNewImageComponent', () => {
  let component: RequestNewImageComponent;
  let fixture: ComponentFixture<RequestNewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestNewImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
