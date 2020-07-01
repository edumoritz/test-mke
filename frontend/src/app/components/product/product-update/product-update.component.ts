import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    nome: '',
    preco: null,
    categoria: ''
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto Editado com Sucesso!');
      this.router.navigate(['/produtos'])
    });
  };

  cancel(): void {
    this.router.navigate(['/produtos'])
  };

}
