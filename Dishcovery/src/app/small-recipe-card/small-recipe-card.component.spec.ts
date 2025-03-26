import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRecipeCardComponent } from './small-recipe-card.component';

describe('SmallRecipeCardComponent', () => {
  let component: SmallRecipeCardComponent;
  let fixture: ComponentFixture<SmallRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallRecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
