import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsControlComponent } from './authors-control.component';
import { By } from '@angular/platform-browser';
import { Author, AuthorPipe } from '@vc-shared/shared.module';

describe('AuthorsControlComponent', () => {
  let component: AuthorsControlComponent;
  let fixture: ComponentFixture<AuthorsControlComponent>;

  const authors: Author[] = [
    { firstName: 'Tommy', lastName: 'Hilf' },
    { firstName: 'Ralph', lastName: 'Laur' },
    { firstName: 'Karl', lastName: 'Lege' }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsControlComponent, AuthorPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsControlComponent);
    component = fixture.componentInstance;
    component.authors = authors;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have courses +10px from left at entry', () => {
    component.ngOnInit();
    setTimeout(() => {
      const inputEl = fixture.debugElement.query(By.css('input'))?.nativeElement;
      expect(inputEl.style.paddingLeft).toContain('10px');
    }, 500);
  });

  it('should handle properly inserted author', () => {
    expect(component.pickedAuthors).toBeFalsy();
    const event = { target: { value: 'Tommy Hilf' } };
    component.inputChanged(event);
    expect(component.pickedAuthors).toBeTruthy();
    expect(component.pickedAuthors.length).toEqual(1);
    expect(component.pickedAuthors[0].firstName).toEqual(authors[0].firstName);
    expect(component.pickedAuthors[0].lastName).toEqual(authors[0].lastName);
  });

  it('should handle wrongly inserted author', () => {
    expect(component.pickedAuthors).toBeFalsy();
    const event = { target: { value: 'Marcin' } };
    component.inputChanged(event);
    expect(component.pickedAuthors).toBeFalsy();
  });

  it('should handle duplicates', () => {
    expect(component.pickedAuthors).toBeFalsy();
    const event = { target: { value: 'Tommy Hilf' } };
    component.inputChanged(event);
    expect(component.pickedAuthors.length).toEqual(1);
    const event2 = { target: { value: 'Ralph Laur' } };
    component.inputChanged(event2);
    expect(component.pickedAuthors.length).toEqual(2);

    const wrongEvent = { target: { value: 'Tommy Hilf' } };
    component.inputChanged(wrongEvent);
    expect(component.pickedAuthors.length).toEqual(2);
    expect(component.pickedAuthors).toEqual([
      { firstName: 'Tommy', lastName: 'Hilf' }, { firstName: 'Ralph', lastName: 'Laur' }
    ]);
  });

  it('should remove author when clicked X', () => {
    expect(component.pickedAuthors).toBeFalsy();
    const event = { target: { value: 'Tommy Hilf' } };
    component.inputChanged(event);
    expect(component.pickedAuthors.length).toEqual(1);
    component.closeBtnClicked({ firstName: 'Tommy', lastName: 'Hilf' });
    expect(component.pickedAuthors.length).toEqual(0);
  });

});
