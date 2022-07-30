import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ImageViewerState } from '../state/image-viewer.reducer';
import { RequestNewImageComponent } from './request-new-image.component';

describe('RequestNewImageComponent', () => {
  let component: RequestNewImageComponent;
  let fixture: ComponentFixture<RequestNewImageComponent>;
  let store: MockStore;
  const initialState: ImageViewerState = {
    loading: false,
    currentImage: {
      garageImageId: 0
    },
    mostRecentImages: [],
    webcamSettings: {
      brightness: 100,
      contrast: 32
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestNewImageComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewImageComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
