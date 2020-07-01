import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[];
  displayedColumns = ['id', 'nome', 'preco', 'categoria', 'action']

  constructor(private produtoService: ProductService) { }

  ngOnInit(): void {
    this.produtoService.read().subscribe(prod => {
      this.products = prod["produtos"];
    })
  }


}
