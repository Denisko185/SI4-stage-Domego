import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pedagogical-questions',
  templateUrl: './pedagogical-questions.component.html',
  styleUrls: ['./pedagogical-questions.component.css']
})
export class PedagogicalQuestionsComponent implements OnInit {

  coulerReponseFausse = '#8bc1d9';
  coulerReponseVraie = '#8bc1d9';
  isBtnCloseVisible = false;

  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    // copy all inputs to avoid polluting them
  }

  wrong() {
    this.coulerReponseFausse = '#f52222';
   // this.close.emit(false);
  }

  right() {
    this.coulerReponseVraie = '#20c731';
    this.isBtnCloseVisible = true;
  }

  closeModal() {
    this.close.emit(true);
  }
}
