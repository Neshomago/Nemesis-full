import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalequipmentComponent } from './additionalequipment.component';

describe('AdditionalequipmentComponent', () => {
  let component: AdditionalequipmentComponent;
  let fixture: ComponentFixture<AdditionalequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalequipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
