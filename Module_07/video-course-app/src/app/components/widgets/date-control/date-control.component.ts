import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.css']
})
export class DateControlComponent implements OnInit {

  formInput = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  setValue(date: Date): void {
    console.log('Setting date', date);
    this.formInput.patchValue(new DatePipe('en-US').transform(date, 'yyyy-MM-dd'));
  }

  getValue(): Date {
    return new Date(this.formInput.value);
  }

}
