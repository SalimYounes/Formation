import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersalleComponent } from './modifiersalle.component';

describe('ModifiersalleComponent', () => {
  let component: ModifiersalleComponent;
  let fixture: ComponentFixture<ModifiersalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiersalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
