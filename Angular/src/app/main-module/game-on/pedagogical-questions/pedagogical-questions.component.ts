import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameOnService} from '../../../service/gameOnService/game-on.service';

@Component({
  selector: 'app-pedagogical-questions',
  templateUrl: './pedagogical-questions.component.html',
  styleUrls: ['./pedagogical-questions.component.css']
})
export class PedagogicalQuestionsComponent implements OnInit {

  coulerReponseFausse = '#8bc1d9';
  coulerReponseVraie = '#8bc1d9';
  isBtnCloseVisible = false;
  choix: number;
  nbrReponsePedago: number;

  @Input() curentActivityTitle = '';
  @Input() dureeProjet = 0;
  @Output() close = new EventEmitter<boolean>();

  constructor(public gameOnService: GameOnService) {
    gameOnService.nbrReponsePedago.subscribe(value => this.nbrReponsePedago = value);
  }

  ngOnInit() {
    this.choix = this.getRandomIntInclusive(1, 7);
  }

  wrong(id: string) {
    // this.coulerReponseFausse = '#f52222';
    document.getElementById(id).style.background = '#f52222';
   // this.close.emit(false);
  }

  right(id: string) {
    this.coulerReponseVraie = '#20c731';
    this.isBtnCloseVisible = true;
  }

  closeModal() {
    this.close.emit(true);
    const nbr = this.nbrReponsePedago++;
    this.gameOnService.nbrReponsePedago.next(nbr);
    if (nbr === 6) {
      this.gameOnService.nbrReponsePedago.next(0);
    }
  }

  // On renvoie un entier aléatoire entre une valeur min (incluse)
  // et une valeur max (incluse).
  // Attention : si on utilisait Math.round(), on aurait une distribution
  // non uniforme !
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
