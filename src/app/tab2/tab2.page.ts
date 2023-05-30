import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from './../shared/product.services';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  producstDb: Product[] = [];
  constructor(
    private aptService: ProductService

  ) { }
  ngOnInit() {
    let produtcsDb = this.aptService.getProductList();
    produtcsDb.snapshotChanges().subscribe(res => {
      this.producstDb = [];
      res.forEach(item => {
        let product: any = item.payload.toJSON();
        product['key'] = item.key;
        this.producstDb.push(product as Product);
      })
    })
    this.fetchProducts();
  }

  fetchProducts() {
    this.aptService.getProductList().valueChanges().subscribe(res => {
      console.log("Lista de produtos recebida: ", res);
    })
  }

  deleteBooking(key: string) {
    console.log(key)
    if (window.confirm('Tem certeza que quer deletar?')) {
      this.aptService.deleteBooking(key);
      console.log("Produto deletado: ", key);
    }
  }
}


