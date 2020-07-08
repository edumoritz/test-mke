import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CategoryReadComponent } from './components/product/category-read/category-read.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtos",
    component: ProductCrudComponent
  },
  {
    path: "categorias",
    component: CategoryReadComponent
  },
  {
    path: "produtos/cadastro",
    component: ProductCreateComponent
  },
  {
    path: "produtos/alterar",
    component: ProductCreateComponent
  },
  {
    path: "produtos/deletar/:id",
    component: ProductDeleteComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
