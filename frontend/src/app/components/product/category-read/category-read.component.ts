import { HeaderService } from './../../template/header/header.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

interface Category {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {
  categories: Category[];
  displayedColumns = ['categoria']

  constructor(private produtoService: ProductService, private headerService: HeaderService) {
    headerService.HeaderData = {
      title: 'Lista de Categorias',
      icon: 'category',
      routeUrl: '/categorias'
    }
  }

  ngOnInit(): void {
    this.produtoService.read().subscribe(prod => {
      this.categories = prod["categorias"];
    })
  }
}
