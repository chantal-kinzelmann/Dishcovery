import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNavBarComponent } from './homepage-nav-bar.component';

describe('HomepageNavBarComponent', () => {
  let component: HomepageNavBarComponent;
  let fixture: ComponentFixture<HomepageNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageNavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
