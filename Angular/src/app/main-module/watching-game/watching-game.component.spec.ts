import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingGameComponent } from './watching-game.component';

describe('WatchingGameComponent', () => {
  let component: WatchingGameComponent;
  let fixture: ComponentFixture<WatchingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
