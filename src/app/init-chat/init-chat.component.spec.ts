import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitChatComponent } from './init-chat.component';

describe('InitChatComponent', () => {
  let component: InitChatComponent;
  let fixture: ComponentFixture<InitChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
