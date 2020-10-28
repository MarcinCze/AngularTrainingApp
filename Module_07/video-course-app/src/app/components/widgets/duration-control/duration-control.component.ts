import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.css']
})
export class DurationControlComponent implements OnInit {

  formInput = new FormControl('');

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  setValue(duration: number): void {
    console.log('Setting duration', duration);
    this.formInput.patchValue(duration);
    this.cd.detectChanges();
  }

  getValue(): number {
    return this.formInput.value;
  }

}
