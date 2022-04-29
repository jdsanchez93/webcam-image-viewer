import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WebcamService } from './webcam.service';
import { GarageImage } from './image.models';
import { HttpClient } from '@angular/common/http';

describe('WebcamService', () => {
  let service: WebcamService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WebcamService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should patch garage items', () => {
    const x: Partial<GarageImage> = {
      numberOfCars: 2
    }
    service.patchGarageImage(1, x).subscribe();
    const req = httpTestingController.expectOne('api/Webcam/1');
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(
      [{
        'path': `/numberOfCars`,
        'op': 'replace',
        'value': 2
      }]
    );
    req.flush(null);
  });

  it('should patch an object with no keys', () => {
    service.patchGarageImage(2, {}).subscribe();
    const req = httpTestingController.expectOne('api/Webcam/2');
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual([]);
    req.flush(null);
  });
});
