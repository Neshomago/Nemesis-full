import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmententryComponent } from './equipmententry.component';

describe('EquipmententryComponent', () => {
  let component: EquipmententryComponent;
  let fixture: ComponentFixture<EquipmententryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmententryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmententryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
