import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercoachComponent } from './modifiercoach.component';

describe('ModifiercoachComponent', () => {
  let component: ModifiercoachComponent;
  let fixture: ComponentFixture<ModifiercoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiercoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
