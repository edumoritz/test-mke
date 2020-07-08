import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  produto: Product; 

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productService.readById(idParam).subscribe(p => {
      this.produto = new Product(        
        p.nome,
        p.preco,
        p.categoria,
        p.id
      )
    })
  }

  deleteProduct(): void {
    console.log(this.produto.id)
    this.productService.delete(this.produto.id).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!');
      this.router.navigate(['/produtos']);
    });
  };

  cancel(): void {
    this.router.navigate(['/produtos']);
  };

}
