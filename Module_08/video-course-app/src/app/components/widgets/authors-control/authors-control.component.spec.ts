import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsControlComponent } from './authors-control.component';

describe('AuthorsControlComponent', () => {
  let component: AuthorsControlComponent;
  let fixture: ComponentFixture<AuthorsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
