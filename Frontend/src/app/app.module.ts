import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProductDescriptionComponent,
    ListProductsComponent,
    CheckoutComponent,
    LandingPageComponent,
    FooterComponent,
    BackButtonComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 750,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
