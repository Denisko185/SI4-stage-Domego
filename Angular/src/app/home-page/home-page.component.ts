import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GameCreatorComponent } from '../modal-module/game-creator/game-creator.component';
import { RoomService } from '../service/roomService/room.service';
import { SocketRequest } from '../../Request';
import { LobbyService } from '../service/lobbyService/lobby.service';
import { RoomsService } from '../rooms.service';
import { Rooms } from '../rooms';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { NzMessageService } from 'ng-zorro-antd';
import { SubscriptionService } from '../service/subscriptionSerivce/subscription.service';
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {GameOnService} from '../service/gameOnService/game-on.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @ViewChild(GameCreatorComponent, { static: true })
  gameCreator;
  value = '';
  username = '';
  listOfDisplayData: Rooms[] = [];
  roomID: any;
  userName: string;
  lobbyIntervalID;

  constructor(private roomsService: RoomsService,
    private globals: Globals,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private message: NzMessageService,
    private lobbyService: LobbyService,
              private gameOnService: GameOnService) {
  }

  ngOnInit() {
    this.getAllLobby();

    this.lobbyIntervalID = setInterval(() => {
      this.getAllLobby();
    }, 5000
    )

    this.lobbyService.messages.subscribe(data => {
      console.log(data);
      if (JSON.stringify(data).includes('userID')) {
        console.log(data.userID);
      }
    });


  }

  getAllLobby() {
    this.roomsService.getRoomsInfos().subscribe(data => {
      console.log(data);
      this.listOfDisplayData = data;
    });
  }

  createASalon() {
    if (this.value !== '') {
      console.log('send userName');
      this.subscriptionService.sendUserName(this.userName);
      this.gameCreator.isCreatingSalon = true;
    } else {
      this.message.warning('Entr??ez votre nom!');
    }
  }

  testdd($event: any) {
    console.log($event);
  }

  joinSalon(data) {
    if (this.value !== '') {
      this.subscriptionService.sendUserName(this.value);
      console.log('Join game');
      const req = {
        request: 'JOIN_GAME',
        roomID: data.roomID,
        username: this.value
      };
      console.log(req);
      this.router.navigate(['gameroom']);
      this.lobbyService.messages.next(req as SocketRequest);
    } else {
      this.message.warning('Entr??ez votre nom!');
    }
  }

  getUsername() {
    this.userName = this.value;
  }

  getDisabled() {
    if (this.value === '') {
      this.message.warning('Entr??ez votre nom!');
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.lobbyIntervalID);
  }

  watch(data) {
    // const crypto = require('crypto');
    // const name = crypto.randomBytes(20).toString('hex');
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    console.log(data.roomID)
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    console.log(data)
    const req = {
      request: 'LANCH_WATCHING',
      roomID: data.roomID,
      gameID: data.roomID,
      username: this.makeid()
    };
    this.router.navigate(['watch']);
    this.gameOnService.messages.next(req as SocketRequest);
  }

  makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
