import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './components/header/header-main/header-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header/header-user/header-user.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { BreadcrumbsComponent } from './components/header/breadcrumbs/breadcrumbs.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderMainComponent,
        FooterComponent,
        HeaderUserComponent,
        HeaderLogoComponent,
        BreadcrumbsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
