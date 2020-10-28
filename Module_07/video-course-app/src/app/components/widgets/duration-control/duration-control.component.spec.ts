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

  it('should set proper value', () => {
    component.setValue(120);
    fixture.detectChanges();
    expect(component.formInput.value).toEqual(120);
  });

  it('should return proper value', () => {
    component.setValue(120);
    fixture.detectChanges();
    expect(component.getValue()).toEqual(120);
  });

  it('should display proper value as hint', () => {
    component.setValue(100);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('1h 40min');
  });

  it('should display proper value as hint if zero', () => {
    expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('0min');
  });
});
