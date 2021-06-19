import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedagogicalQuestionsComponent } from './pedagogical-questions.component';

describe('PedagogicalQuestionsComponent', () => {
  let component: PedagogicalQuestionsComponent;
  let fixture: ComponentFixture<PedagogicalQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedagogicalQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedagogicalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
