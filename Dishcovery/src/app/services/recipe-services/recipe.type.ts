export type BaseEntity = {
  id: string;
  createdAt: Date;
};

export type Recipe = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  text: string;
  imgUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number;
  cookTime: number;
  ratings: Rating[];
  ingredients: Ingredient[];
  userId: string; // Referenz auf die user.id des Erstellers
  updatedAt: Date;
  };

  // Zutaten mit Menge und Einheit
export type Ingredient = {
  servings: string; // Für wie viel Portionen die Werte sind
  name: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}

// Bewertungen
export type Rating = {
  id: string;
  createdAt: Date;
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  updatedAt: Date;
}