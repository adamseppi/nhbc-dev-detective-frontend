import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCheckInComponent } from './inventory-check-in.component';

describe('InventoryCheckInComponent', () => {
  let component: InventoryCheckInComponent;
  let fixture: ComponentFixture<InventoryCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
