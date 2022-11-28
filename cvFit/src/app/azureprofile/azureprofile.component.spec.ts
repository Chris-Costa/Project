import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AZUREprofileComponent } from './azureprofile.component';

describe('AZUREprofileComponent', () => {
  let component: AZUREprofileComponent;
  let fixture: ComponentFixture<AZUREprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AZUREprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AZUREprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
