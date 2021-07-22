import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameOnService} from '../../../service/gameOnService/game-on.service';
import {HttpClient} from '@angular/common/http';
import {Questions} from '../../../model/Questions';

@Component({
  selector: 'app-pedagogical-questions',
  templateUrl: './pedagogical-questions.component.html',
  styleUrls: ['./pedagogical-questions.component.css']
})
export class PedagogicalQuestionsComponent implements OnInit {

  questions = [];
  coulerReponseFausse = '#8bc1d9';
  coulerReponseVraie = '#8bc1d9';
  isBtnCloseVisible = false;
  choix: number;
  nbrReponsePedago: number;

  @Input() curentActivityTitle = '';
  @Input() dureeProjet = 0;
  @Output() close = new EventEmitter<boolean>();

  constructor(public gameOnService: GameOnService, private http: HttpClient) {
    gameOnService.nbrReponsePedago.subscribe(value => this.nbrReponsePedago = value);
  }

  ngOnInit() {
    this.choix = this.getRandomIntInclusive(1, 7);
    this.getTxt();
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

  getTxt() {
      this.http.get('../../../../assets/wifirst.txt', { responseType: 'text' }).subscribe(data => {
        const result = data.split('\n');

        for (const element of result) {
          const preQuestion = element.split('#');
          const answer = [];
          const numAns = preQuestion[0];
          const title = preQuestion[1];
          for (let i = 2; i <= preQuestion.length; i++) {
              if (preQuestion[i] !== undefined) {
              answer.push(preQuestion[i]);
              }
          }
          if ( title !== undefined) {
          const question = new Questions(numAns, title, answer);
          this.questions.push(question);
          }

        }
        console.log(this.questions);
      });
  }
}
