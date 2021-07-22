import { Component, OnInit } from '@angular/core';
import {GameOnService} from '../../service/gameOnService/game-on.service';
import {LobbyService} from '../../service/lobbyService/lobby.service';
import {WatchingService} from '../../service/WatchingService/watching.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-watching-game',
  templateUrl: './watching-game.component.html',
  styleUrls: ['./watching-game.component.css']
})
export class WatchingGameComponent implements OnInit {

  currentStep = [];
  step: any;
  constructor(private gameOnService: GameOnService ,  private lobbyService: LobbyService,
              private watchingService: WatchingService, private http: HttpClient) { }

  ngOnInit(): void {
    this.gameOnService.currentStepSubject.subscribe(data => {
      this.currentStep = data;
      console.log(data);
    });
  }
  getCurrentStep($event: any) {
    this.step = $event;
  }

  getStepTest($event: any) {
  }

  loadTxt() {
    this.http.get('assets/opt.txt').subscribe(data => {
      console.log(data);
    });
  }
}
