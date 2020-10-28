import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AppUser } from '@vc-shared/shared.module';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const lsUserKey = 'VC_User';
  const lsTokenKey = 'VC_Token';
  const srvUrl = 'https://api-video-course.azurewebsites.net/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {
    const expectedResponse = '123456789qwerty';
    service.login('marcin@marcin.pl', 'abc123')
      .subscribe(response => {
        expect(response).toBeTruthy();
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedResponse);
        expect(localStorage.getItem(lsTokenKey)).toBeTruthy();
        expect(localStorage.getItem(lsUserKey)).toBeFalsy();
        expect(localStorage.getItem(lsTokenKey)).toEqual(expectedResponse);
        expect(service.getToken()).toEqual(expectedResponse);
      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("POST");
    req.flush(expectedResponse);
  });

  it('should not log in because of wrong credentials', () => {
    service.logout();
    service.login('marcin@marcin.pl', 'abc123')
      .subscribe(response => {
        expect(response).toBeFalsy();
      }, error => {
        expect(error).toEqual('Invalid credentials. Please verify login & password');
      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("POST");
    req.flush('Invalid credentials', { status: 401, statusText: 'Not Authenticated' });
  })

  it('should log in and log out', () => {
    const expectedResponse = '123456789qwerty';
    service.login('marcin@marcin.pl', 'abc123')
      .subscribe(() => {
        expect(localStorage.getItem(lsTokenKey)).toBeTruthy();
        expect(localStorage.getItem(lsUserKey)).toBeFalsy();
        expect(localStorage.getItem(lsTokenKey)).toEqual(expectedResponse);

        service.logout();
        expect(localStorage.getItem(lsTokenKey)).toBeFalsy();
        expect(localStorage.getItem(lsUserKey)).toBeFalsy();
      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("POST");
    req.flush(expectedResponse);
  });

  it('should not return any user', () => {
    service.logout();
    service.userInfo.subscribe(user => {
      expect(user).toBeFalsy();
    });
  });

  it('should not return any token', () => {
    service.logout();
    expect(service.getToken()).toBeFalsy();
  });

  it('should take user from server and save it locally', () => {
    service.logout();
    service.userInfo.subscribe(user => expect(user).toBeFalsy());

    const expectedResponse: AppUser = { id: 1, firstName: 'Marcin', lastName: 'Cze' };
    service.getUserInfoFromSrv()
      .subscribe(response => {
        expect(response.body).toEqual(expectedResponse);
        expect(localStorage.getItem(lsUserKey)).toBeTruthy();
        service.userInfo.subscribe(user => {
          expect(user).toBeTruthy();
          expect(user.id).toEqual(expectedResponse.id);
        });
      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedResponse);
  });

  it('should be authenticated', () => {
    const expectedToken = '123456789qwerty';
    const expectedUser: AppUser = { id: 1, firstName: 'Marcin', lastName: 'Cze' };

    service.login('marcin@marcin.pl', 'abc123')
      .subscribe(response => {
        expect(response).toBeTruthy();
        expect(response.body).toEqual(expectedToken);

        service.getUserInfoFromSrv()
          .subscribe(response => {
            expect(response).toBeTruthy();
            expect(response.body).toEqual(expectedUser);
            service.isLogged.subscribe(logged => expect(logged).toBeTrue());
          });

        const req = httpMock.expectOne(`${srvUrl}`);
        expect(req.request.method).toBe("GET");
        req.flush(expectedUser);

      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("POST");
    req.flush(expectedToken);
  });

  it('should not be authenticated', () => {
    const expectedToken = '123456789qwerty';

    service.login('marcin@marcin.pl', 'abc123')
      .subscribe(response => {
        expect(response).toBeTruthy();
        expect(response.body).toEqual(expectedToken);
        service.isLogged.subscribe(logged => expect(logged).toBeFalse());
      });

    const req = httpMock.expectOne(`${srvUrl}`);
    expect(req.request.method).toBe("POST");
    req.flush(expectedToken);
  });
});
