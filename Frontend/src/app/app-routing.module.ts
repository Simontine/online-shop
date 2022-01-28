import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "shop", component: ProductsComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "listproducts", component: ListProductsComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "home", component: LandingPageComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
