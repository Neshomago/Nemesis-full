import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingcompoComponent } from './testingcompo.component';

describe('TestingcompoComponent', () => {
  let component: TestingcompoComponent;
  let fixture: ComponentFixture<TestingcompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingcompoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingcompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
