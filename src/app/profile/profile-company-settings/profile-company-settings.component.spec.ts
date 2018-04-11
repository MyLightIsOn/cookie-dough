import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompanySettingsComponent } from './profile-company-settings.component';

describe('ProfileCompanySettingsComponent', () => {
  let component: ProfileCompanySettingsComponent;
  let fixture: ComponentFixture<ProfileCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
