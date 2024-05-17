import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Dummy data
  data = [
    { name: 'Item 1', /* other properties */ },
    { name: 'Item 2', /* other properties */ },
    // Add more dummy data
  ];

   dummyData = [
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.99 },
    { id: 2, name: 'Banana', category: 'Fruit', price: 0.99 },
    { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.49 },
    { id: 4, name: 'Broccoli', category: 'Vegetable', price: 0.79 },
    { id: 5, name: 'Mango', category: 'Fruit', price: 2.49 },
    { id: 6, name: 'Tomato', category: 'Vegetable', price: 0.69 },
    { id: 7, name: 'Pineapple', category: 'Fruit', price: 2.99 },
    { id: 8, name: 'Strawberry', category: 'Fruit', price: 3.49 },
    { id: 9, name: 'Orange', category: 'Fruit', price: 1.29 },
    { id: 10, name: 'Cucumber', category: 'Vegetable', price: 0.99 },
    { id: 11, name: 'Grapes', category: 'Fruit', price: 2.99 },
    { id: 12, name: 'Lettuce', category: 'Vegetable', price: 1.49 },
    { id: 13, name: 'Potato', category: 'Vegetable', price: 0.39 },
    { id: 14, name: 'Watermelon', category: 'Fruit', price: 4.99 },
    { id: 15, name: 'Eggplant', category: 'Vegetable', price: 1.79 },
    { id: 16, name: 'Avocado', category: 'Fruit', price: 2.79 },
    { id: 17, name: 'Zucchini', category: 'Vegetable', price: 1.29 },
    { id: 18, name: 'Kiwi', category: 'Fruit', price: 1.99 },
    { id: 19, name: 'Onion', category: 'Vegetable', price: 0.59 },
    { id: 20, name: 'Pepper', category: 'Vegetable', price: 0.89 }
  ];
  

  constructor() { }

  search(query: string): any[] {
    // Dummy search function, replace it with actual search logic
    console.log(this.dummyData.filter(item => item.category.toLowerCase().includes(query.toLowerCase())));
    
    return this.dummyData.filter(item => item.category.toLowerCase().includes(query.toLowerCase()));
  }
}
