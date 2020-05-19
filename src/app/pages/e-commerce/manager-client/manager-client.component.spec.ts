import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClientComponent } from './manager-client.component';

describe('ManagerClientComponent', () => {
  let component: ManagerClientComponent;
  let fixture: ComponentFixture<ManagerClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
