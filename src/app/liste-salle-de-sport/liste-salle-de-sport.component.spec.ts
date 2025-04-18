import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSalleDeSportComponent } from './liste-salle-de-sport.component';

describe('ListeSalleDeSportComponent', () => {
  let component: ListeSalleDeSportComponent;
  let fixture: ComponentFixture<ListeSalleDeSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSalleDeSportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSalleDeSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
