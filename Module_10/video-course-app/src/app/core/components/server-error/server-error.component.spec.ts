import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorComponent } from './server-error.component';
import { By } from '@angular/platform-browser';

describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper data in properties', () => {
    expect(component.title).toContain('Oops!');
    expect(component.code).toContain('Technical issue');
    expect(component.messageLine1).toContain('The page you are looking for cannot connect to the server.');
    expect(component.messageLine2).toContain('Please try again later.');
  });

  it('should have proper binding', () => {
    expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toContain(component.title);
    expect(fixture.debugElement.query(By.css('.code')).nativeElement.textContent).toContain(component.code.toUpperCase());
    expect(fixture.debugElement.query(By.css('.line1')).nativeElement.textContent).toContain(component.messageLine1);
    expect(fixture.debugElement.query(By.css('.line2')).nativeElement.textContent).toContain(component.messageLine2);
  });
});
