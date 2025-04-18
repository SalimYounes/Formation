import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAbonnementsComponent } from './liste-abonnements.component';

describe('ListeAbonnementsComponent', () => {
  let component: ListeAbonnementsComponent;
  let fixture: ComponentFixture<ListeAbonnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAbonnementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
