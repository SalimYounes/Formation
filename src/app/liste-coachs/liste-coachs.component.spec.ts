import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoachsComponent } from './liste-coachs.component';

describe('ListeCoachsComponent', () => {
  let component: ListeCoachsComponent;
  let fixture: ComponentFixture<ListeCoachsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCoachsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCoachsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
