import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageComponent } from './no-page.component';
import { By } from '@angular/platform-browser';

describe('NoPageComponent', () => {
  let component: NoPageComponent;
  let fixture: ComponentFixture<NoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper data in properties', () => {
    expect(component.title).toContain('Oops!');
    expect(component.code).toContain('404 - page not found');
    expect(component.messageLine1).toContain('The page you are looking for might have been removed,');
    expect(component.messageLine2).toContain('had its name changed or is temporarily unavailable.');
  });

  it('should have proper binding', () => {
    expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toContain(component.title);
    expect(fixture.debugElement.query(By.css('.code')).nativeElement.textContent).toContain(component.code.toUpperCase());
    expect(fixture.debugElement.query(By.css('.line1')).nativeElement.textContent).toContain(component.messageLine1);
    expect(fixture.debugElement.query(By.css('.line2')).nativeElement.textContent).toContain(component.messageLine2);
  });
});
