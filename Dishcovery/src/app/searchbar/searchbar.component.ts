import { Component, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-searchbar',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  // @Input('recipes') recipes$!: Observable<Recipe []>;
  // recipes$?: Observable<string[]>;
  // searchControl = new FormControl('');
  // @Output('SelectedRecipe') selectedRecipe$: Observable<string> = this.searchControl.valueChanges.pipe(map(value => value || ''));

  // ngOnInit(): void {
  //   this.recipes$ = 
  //   );
  // }
}
