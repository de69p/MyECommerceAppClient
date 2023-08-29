import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartSubscription = new Subscription();
  }


  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(
      (items) => {
        this.cart = items;
      }
    );
    this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  updateQuantity(product: Product, quantity: number): void {
    this.cartService.updateQuantity(product, quantity);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }
}
