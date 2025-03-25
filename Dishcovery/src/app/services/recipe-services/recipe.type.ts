import { User } from "../user-services/user.type";

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
  servings: number; //Menge der Portionen, für welche das Rezept gedacht ist
  ratings: Rating[];
  ingredients: Ingredient[];
  user: User; // Referenz auf den Ersteller
  updatedAt: Date;
  tags: Tag[];
  };

  // Zutaten mit Menge und Einheit
export type Ingredient = {
  name: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}

// Bewertungen
export type Rating = {
  id: string;
  createdAt: Date;
  user: User; // Referenz auf den Ersteller
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  updatedAt: Date;
}

export type Tag = {
  id: number;
  name: string;
}