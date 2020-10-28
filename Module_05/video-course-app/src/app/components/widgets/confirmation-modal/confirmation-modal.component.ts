import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() title: string;
  @Input() message: string;
  @Output() answerProvided = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.title = 'Confirmation';
    this.message = 'Are you sure to remove it?';
  }

  onBtnClick(confirmed: boolean): void {
    console.log('Confirmed: ', confirmed);
    this.answerProvided.emit(confirmed);
  }

}
