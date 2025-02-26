import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptkarteComponent } from './rezeptkarte.component';

describe('RezeptkarteComponent', () => {
  let component: RezeptkarteComponent;
  let fixture: ComponentFixture<RezeptkarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezeptkarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezeptkarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
