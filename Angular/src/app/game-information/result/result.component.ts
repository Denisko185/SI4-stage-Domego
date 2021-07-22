import {Component, Input, OnInit} from '@angular/core';
import {GameOnService} from '../../service/gameOnService/game-on.service';
import {SubscriptionService} from '../../service/subscriptionSerivce/subscription.service';
import {Roles} from '../../model/roles';
import {Router} from '@angular/router';
import {PedagoPoints} from '../../service/PedagoPoints';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() pdv = [];
  @Input() detail = [];
  // @Input() projectInfo = [];
  duration = 0;
  failure = 0;
  cost = 0;
  results = [];
  myRole: any;
  roles = Roles;
  // pedagoReponsePoints = [];
  responsePoints1: number;
  responsePoints2: number;
  responsePoints3: number;
  responsePoints4: number;
  responsePoints5: number;
  responsePoints6: number;

  data: any[] = [];

  constructor(private gameOnService: GameOnService,
              private router: Router,
              private subscription: SubscriptionService) {
  }

  ngOnInit() {
    this.myRole = this.subscription.myRole;
    this.cost = this.gameOnService.results.project.costProject;
    this.failure = this.gameOnService.results.project.risks;
    this.duration = this.gameOnService.results.project.days;
    this.results = this.gameOnService.results.ranking;
    // this.pedagoReponsePoints = this.gameOnService.results.pedagoReponsePoints;
    /*console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(this.pedagoReponsePoints);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');*/
    this.responsePoints1 = PedagoPoints.responsePoints1 > 0 ? PedagoPoints.responsePoints1 : 0;
    this.responsePoints2 = PedagoPoints.responsePoints2 > 0 ? PedagoPoints.responsePoints2 : 0;
    this.responsePoints3 = PedagoPoints.responsePoints3 > 0 ? PedagoPoints.responsePoints3 : 0;
    this.responsePoints4 = PedagoPoints.responsePoints4 > 0 ? PedagoPoints.responsePoints4 : 0;
    this.responsePoints5 = PedagoPoints.responsePoints5 > 0 ? PedagoPoints.responsePoints5 : 0;
    this.responsePoints6 = PedagoPoints.responsePoints6 > 0 ? PedagoPoints.responsePoints6 : 0;
    this.loadData();
  }

  loadData(): void {

    console.log(PedagoPoints.responsePoints1);
    console.log(PedagoPoints.responsePoints2);
    console.log(PedagoPoints.responsePoints3);
    console.log(PedagoPoints.responsePoints4);
    console.log(PedagoPoints.responsePoints5);
    console.log(PedagoPoints.responsePoints6);

    for (const item of this.results) {
      console.log('iiiiiiiiiiiiiiiitttttttttttttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      console.log(item);
      console.log('iiiiiiiiiiiiiiiitttttttttttttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      const detail = {
        money: item.information.moneyOriginal,
        moneyRemain: item.information.moneyRemain,
        moneyPayed: item.information.moneyPaid,
        resourcePayed: item.information.resourcesPaid,
        resourceReamin: item.information.resourcesRemain,
        riskReduced: item.information.riskReduced,
        dayReduced: item.information.dayReduced,
        contactNegociated: item.information.contractNegotiated
      };
      const tmp = {
        title: this.getRoleById(item.player.roleID).title,
        user: item.player.username,
        id: item.player.roleID,
        point: item.NumberOfVictoryPoints,
        details: detail,
        rank: item.rank,
        pedagoPoint: item.player.pedagopoints,
        src: this.getRoleById(item.player.roleID).src,
      };
      this.data.push(tmp);
    }

  }

  getRoleById(id) {
    return this.roles.filter(next => next.id === id)[0];
  }


  quit() {
    console.log('quit');
    this.router.navigate(['']);
  }
}
