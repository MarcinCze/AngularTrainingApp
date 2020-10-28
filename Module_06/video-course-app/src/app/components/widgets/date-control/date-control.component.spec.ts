import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateControlComponent } from './date-control.component';
import { FormsModule } from '@angular/forms';

describe('DateControlComponent', () => {
  let component: DateControlComponent;
  let fixture: ComponentFixture<DateControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set proper value', () => {
    const refDate = new Date('1990-09-11');
    component.setValue(refDate);
    fixture.detectChanges();
    expect(component.formInput.value).toContain('1990-09-11');
  });

  it('should return proper value', () => {
    const refDate = new Date('1990-09-11');
    component.setValue(refDate);
    fixture.detectChanges();
    expect(component.getValue()).toEqual(refDate);
  });
});
