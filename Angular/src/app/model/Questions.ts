export class Questions {
   numGoodAnswer: string;
  title: string;
   answers: string[];


  constructor(num, ti , ans) {
    this.numGoodAnswer = num;
    this.title = ti;
    this.answers = ans;
  }
}
