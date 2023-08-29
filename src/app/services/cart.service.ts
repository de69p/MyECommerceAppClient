import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product: Product): void {
    this.http.post(`http://localhost:5001/api/cart`, {Product: product, quantity: 1}).subscribe({
      next: (response) => {
        console.log('Product added to cart successfully', response);
        this.getCart();
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
      }
    });
  }

  getCart(): void {
    this.http.get<CartItem[]>('http://localhost:5001/api/cart').subscribe({
      next: (items) => {
        this.cartSubject.next(items);
      },
      error: (error) => {
        console.error('Error getting cart', error);
      }
    });
  }

  updateQuantity(product: Product, quantity: number): void {
    this.http.put(`http://localhost:5001/api/cart/${product.id}`, {quantity}).subscribe({
      next: () => {
        this.getCart();
      },
      error: (error) => {
        console.error('Error updating quantity', error);
      }
    });
  }

  removeFromCart(product: Product): void {
    this.http.delete(`http://localhost:5001/api/cart/${product.id}`).subscribe({
      next: () => {
        this.getCart();
      },
      error: (error) => {
        console.error('Error removing from cart', error);
      }
    });
  }
}
