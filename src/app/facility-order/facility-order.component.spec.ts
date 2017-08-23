import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityOrderComponent } from './facility-order.component';

describe('FacilityOrderComponent', () => {
  let component: FacilityOrderComponent;
  let fixture: ComponentFixture<FacilityOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
