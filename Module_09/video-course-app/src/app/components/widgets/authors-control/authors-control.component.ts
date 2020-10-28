import { Component, OnInit, Input, ElementRef, forwardRef } from '@angular/core';
import { Author } from '../../../models/author';
import { ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true
    }
  ]
})
export class AuthorsControlComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() authors: Author[];

  public pickedAuthors: Author[];
  public authorsInput = new FormControl('');
  private refreshTimeMs = 250;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.adjustCursor();
    }, this.refreshTimeMs);
  }

  inputChanged(event: any): void {
    console.log(event);
    const inputValue = event.target.value;
    console.log('Input changed: ', inputValue);
    this.authorsInput.markAsTouched();

    this.authors.forEach(author => {
      if (inputValue === `${author.firstName} ${author.lastName}`) {
        this.addAuthor(author);
        this.cleanInput(event);

        setTimeout(() => {
          this.adjustCursor();
        }, this.refreshTimeMs);

        return;
      }
    });
  }

  closeBtnClicked(pickedAuthor: Author): void {
    this.removeAuthor(pickedAuthor);
    this.authorsInput.markAsTouched();

    setTimeout(() => {
      this.adjustCursor();
    }, this.refreshTimeMs);
  }

  cleanInput(event: any): void {
    console.log('Cleaning input');
    event.target.value = '';
    this.authorsInput.markAsTouched();
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    console.log('AuthorsControlComponent Inside writeValue', val);
    this.authorsInput.setValue(val);
    this.pickedAuthors = val;
    setTimeout(() => {
      this.adjustCursor();
    }, this.refreshTimeMs);
  }

  registerOnChange(fn: any): void {
    // console.log('on change');
    this.authorsInput.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.authorsInput.disable() : this.authorsInput.enable();
  }

  validate(control: AbstractControl): ValidationErrors {
    this.authorsInput.setValidators(control.validator);
    console.log('AuthorsInput Errors ', this.authorsInput.errors);

    return this.authorsInput.valid ? null : this.authorsInput.errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    // console.log('registerOnValidatorChange');
  }

  private addAuthor(author: Author): void {
    let canBeAdded = true;

    if (this.pickedAuthors == null) {
      this.pickedAuthors = new Array<Author>();
      this.pickedAuthors.push(author);
      this.authorsInput.setValue(this.pickedAuthors);
      console.log('Picked authors', this.pickedAuthors);
    }

    this.pickedAuthors.forEach(picked => {
      if (picked === author) {
        canBeAdded = false;
      }
    });

    if (canBeAdded) {
      this.pickedAuthors.push(author);
    }

    this.authorsInput.setValue(this.pickedAuthors);
    console.log('Picked authors', this.pickedAuthors);
  }

  private removeAuthor(author: Author): void {
    const removeIndex = this.pickedAuthors.map((item) => item).indexOf(author);
    this.pickedAuthors.splice(removeIndex, 1);
    this.authorsInput.setValue(this.pickedAuthors);
  }

  private adjustCursor(): void {
    const width = this.element.nativeElement.children[1].getBoundingClientRect()?.width;
    console.log('Adjusting cursor. Authors width:', width);
    this.element.nativeElement.children[0].children[0].style.paddingLeft = `${width + 10}px`;
  }

}
