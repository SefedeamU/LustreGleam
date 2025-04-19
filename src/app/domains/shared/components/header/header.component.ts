import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { Product } from "@shared/models/product.model";
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input({required : true}) cart: Product[] = [];
  @Output() removeToCart = new EventEmitter<Product>();

  hideCart = signal<boolean>(true);
  totalPrice = signal<number>(0);

  ngOnChanges(changes: SimpleChanges){
    if(changes['cart']) {
      this.setTotalPrice();
    }
  }

  cartHandler() {
    this.hideCart.update(prevState => !prevState);
    console.log('cambio en el carrito detectado!');
  }

  setTotalPrice(){
    const total = this.cart.reduce((total, product) => total + product.price, 0);
    this.totalPrice.set(total);
  }

  onRemove(product: Product) {
    console.log('Estamos eliminando un producto desde el hijo!');
    this.removeToCart.emit(product);
  }
}
