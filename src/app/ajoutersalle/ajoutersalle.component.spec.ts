import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutersalleComponent } from './ajoutersalle.component';

describe('AjoutersalleComponent', () => {
  let component: AjoutersalleComponent;
  let fixture: ComponentFixture<AjoutersalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutersalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutersalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
