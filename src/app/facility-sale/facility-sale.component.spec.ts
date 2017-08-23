import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySaleComponent } from './facility-sale.component';

describe('FacilitySaleComponent', () => {
  let component: FacilitySaleComponent;
  let fixture: ComponentFixture<FacilitySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
