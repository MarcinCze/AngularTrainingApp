import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { By } from '@angular/platform-browser';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invisible', () => {
    component.isVisible = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.modal-overlay'))).toBeNull();
  });

  it('should be visible', () => {
    component.isVisible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.modal-overlay'))).toBeTruthy();
  });

  it('should have proper title and message', () => {
    component.isVisible = true;
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('Test Title');
    expect(fixture.debugElement.query(By.css('p')).nativeElement.textContent).toContain('Test Message');
  });
});
