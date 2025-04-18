import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercoachComponent } from './ajoutercoach.component';

describe('AjoutercoachComponent', () => {
  let component: AjoutercoachComponent;
  let fixture: ComponentFixture<AjoutercoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutercoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
