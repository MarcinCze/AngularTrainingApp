import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationControlComponent } from './duration-control.component';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { By } from '@angular/platform-browser';

describe('DurationControlComponent', () => {
  let component: DurationControlComponent;
  let fixture: ComponentFixture<DurationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationControlComponent, DurationPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper value as hint if zero', () => {
    expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('0min');
  });
});
