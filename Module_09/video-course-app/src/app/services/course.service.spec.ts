import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoCourse } from '../models/video-course';
import { Author } from '../models/author';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const srvUrl = 'https://api-video-course.azurewebsites.net/api';

  const expectedListResponse: VideoCourse[] = [
    {
      id: 1, title: 'Test Title', description: 'Test description 1', duration: 120,
      topRated: false, creationDate: new Date('2020-02-01'),
      authors: [{ firstName: 'Marcin', lastName: 'Cze' }]
    },
    {
      id: 2, title: 'Test Title 2', description: 'Test description 2', duration: 61,
      topRated: false, creationDate: new Date('2019-12-06'),
      authors: [{ firstName: 'Marcin', lastName: 'Test' }]
    },
    {
      id: 3, title: 'Test Title 3', description: 'Test description 3', duration: 620,
      topRated: true, creationDate: new Date('2018-05-01'),
      authors: [{ firstName: 'Marcin', lastName: 'Cze' }, { firstName: 'Marcin', lastName: 'Cze' }]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial values of pageNumber and perPage', () => {
    expect(service['perPage']).toEqual(4);
    expect(service['pageNmbr']).toEqual(1);
  });

  it('should get list from given page', () => {
    service.getList()
      .subscribe(response => {
        expect(response.body.courses).toEqual(expectedListResponse);
      });

    const req = httpMock.expectOne(`${srvUrl}/courses/4/1`);
    expect(req.request.method).toBe("GET");
    req.flush({ courses: expectedListResponse });
  });

  it('should get one given course', () => {
    service.getItemById(3)
      .subscribe(response => {
        expect(response.body).toEqual(expectedListResponse[2]);
      });

    const req = httpMock.expectOne(`${srvUrl}/course/3`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedListResponse[2]);
  })

  it('should create an item and return it', () => {
    const newCourse: VideoCourse = {
      id: null, title: 'Test Title', description: 'Test description 1', duration: 120,
      topRated: false, creationDate: new Date('2020-02-01'),
      authors: [{ firstName: 'Marcin', lastName: 'Cze' }]
    };

    service.createItem(newCourse)
      .subscribe(response => {
        expect(response.body).toBeTruthy();
        expect(response.body.id).toEqual(expectedListResponse[0].id);
        expect(response.body).toEqual(expectedListResponse[0]);
      });

    const req = httpMock.expectOne(`${srvUrl}/course`);
    expect(req.request.method).toBe('PUT');
    req.flush(expectedListResponse[0]);
  });

  it('should modify an item and return it', () => {
    const course: VideoCourse = {
      id: 1, title: 'Test Title', description: 'Test description 1', duration: 120,
      topRated: false, creationDate: new Date('2020-02-01'),
      authors: [{ firstName: 'Marcin', lastName: 'Cze' }]
    };

    service.updateItem(course)
      .subscribe(response => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(expectedListResponse[0]);
      });

    const req = httpMock.expectOne(`${srvUrl}/course`);
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedListResponse[0]);
  });

  it('should remove an item and return it', () => {
    const course: VideoCourse = {
      id: 1, title: 'Test Title', description: 'Test description 1', duration: 120,
      topRated: false, creationDate: new Date('2020-02-01'),
      authors: [{ firstName: 'Marcin', lastName: 'Cze' }]
    };

    service.removeItem(course.id)
      .subscribe(response => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(expectedListResponse[0]);
      });

    const req = httpMock.expectOne(`${srvUrl}/course/${course.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedListResponse[0]);
  });

  it('should get authors', () => {
    const authors: Author[] = [
      { firstName: 'Marcin', lastName: 'Cze' },
      { firstName: 'Test', lastName: 'Testowy' }
    ];

    service.getAuthors()
      .subscribe(response => {
        expect(response.body).toBeTruthy();
        expect(response.body.length).toEqual(authors.length);
        expect(response.body).toEqual(authors);
      });

    const req = httpMock.expectOne(`${srvUrl}/author`);
    expect(req.request.method).toBe('GET');
    req.flush(authors);
  });

  it('should call for courses with given word', () => {
    const word = 'test';
    service.searchItems(word)
      .subscribe(response => {
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(expectedListResponse);
      });

    const req = httpMock.expectOne(`${srvUrl}/courses/search/${word}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedListResponse);
  });

  it('should get next part of courses', () => {
    expect(service['perPage']).toEqual(4);
    expect(service['pageNmbr']).toEqual(1);

    service.getList()
      .subscribe(response => {
        expect(response.body.courses).toEqual(expectedListResponse);
        service.increasePageNumber();
        service.getList()
          .subscribe(response => {
            expect(response.body.courses).toEqual(expectedListResponse);
          });
        const req = httpMock.expectOne(`${srvUrl}/courses/4/2`);
        expect(req.request.method).toBe("GET");
        req.flush({ courses: expectedListResponse });
      });

    const req = httpMock.expectOne(`${srvUrl}/courses/4/1`);
    expect(req.request.method).toBe("GET");
    req.flush({ courses: expectedListResponse });
  });

  it('should get and set page number', () => {
    expect(service['perPage']).toEqual(4);
    expect(service['pageNmbr']).toEqual(1);
    expect(service.getPageNumber()).toEqual(1);
    service.increasePageNumber();
    expect(service['perPage']).toEqual(4);
    expect(service['pageNmbr']).toEqual(2);
    expect(service.getPageNumber()).toEqual(2);
    service.setPageNumber(10);
    expect(service['perPage']).toEqual(4);
    expect(service['pageNmbr']).toEqual(10);
    expect(service.getPageNumber()).toEqual(10);
  });

});
