import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeComponent } from './new-recipe.component';

describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
