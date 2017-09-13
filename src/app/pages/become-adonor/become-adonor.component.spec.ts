import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAdonorComponent } from './become-adonor.component';

describe('BecomeAdonorComponent', () => {
  let component: BecomeAdonorComponent;
  let fixture: ComponentFixture<BecomeAdonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAdonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAdonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
