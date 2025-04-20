import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorPage } from './actor.page';

describe('ActorPage', () => {
  let component: ActorPage;
  let fixture: ComponentFixture<ActorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
