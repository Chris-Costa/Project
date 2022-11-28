import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAzureComponent } from './profile-azure.component';

describe('ProfileAzureComponent', () => {
  let component: ProfileAzureComponent;
  let fixture: ComponentFixture<ProfileAzureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAzureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAzureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
