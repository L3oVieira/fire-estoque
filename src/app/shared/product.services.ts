import { Inject, Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private dbPath = '/products'
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase) {
    this.bookingListRef = db.list(this.dbPath);
    this.bookingRef = this.db.object('/products/');
  }

  // Create
  createProduct(apt: Product) {

    return this.bookingListRef.push({
      name: apt.name,
      desc: apt.desc,
      price: apt.price

    })

  }

  // Get Single
  getProduct(key: string) {
    this.bookingRef = this.db.object('/products/' + key);
    return this.bookingRef;

  }

  // Get List
  getProductList() {
    this.bookingListRef = this.db.list('/products');
    return this.bookingListRef;

  }

  // Update
  updateProduct(key: string, apt: Product) {
    return this.bookingRef.update({
      name: apt.name,
      desc: apt.desc,
      price: apt.price

    })

  }

  // Delete
  deleteBooking(key: string) {
    this.bookingRef = this.db.object('/products/' + key);
    this.bookingRef.remove();
  }
}

