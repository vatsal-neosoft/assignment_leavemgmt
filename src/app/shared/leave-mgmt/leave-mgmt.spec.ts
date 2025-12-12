import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMgmt } from './leave-mgmt';

describe('LeaveMgmt', () => {
  let component: LeaveMgmt;
  let fixture: ComponentFixture<LeaveMgmt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveMgmt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveMgmt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
