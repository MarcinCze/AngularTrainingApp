import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLogoComponent } from './header-logo.component';
import { By } from '@angular/platform-browser';

describe('HeaderLogoComponent', () => {
  let component: HeaderLogoComponent;
  let fixture: ComponentFixture<HeaderLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderLogoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "video couse"', () => {
    expect(component.title).toBe('video course');
  });

  it('should have title in the header span', () => {
    const courseDateElement = fixture.debugElement.query(By.css('.header-logo-title')).nativeElement;
    expect(courseDateElement.textContent).toContain('video course'.toUpperCase());
  });
});
