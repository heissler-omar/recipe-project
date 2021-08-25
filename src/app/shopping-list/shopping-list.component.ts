import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shopListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopListService.getIngredients();
    this.subscription = this.shopListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  /* onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.shopListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  } */

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
