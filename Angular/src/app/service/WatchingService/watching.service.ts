import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchingService {
  subscriptionData = new Subject<any>();
  constructor() { }
}
