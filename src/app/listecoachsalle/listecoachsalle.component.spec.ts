import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecoachsalleComponent } from './listecoachsalle.component';

describe('ListecoachsalleComponent', () => {
  let component: ListecoachsalleComponent;
  let fixture: ComponentFixture<ListecoachsalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListecoachsalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListecoachsalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
