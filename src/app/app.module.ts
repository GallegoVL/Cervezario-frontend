import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';   // Para que funcione en el navegador
 // Componente al que redirigirás
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './products/register-form/register-form.component';
import { ToastComponent } from './products/toast/toast.component';



@NgModule({
  declarations:[
   ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    AppRoutingModule ,
    RouterModule,        // Módulo que maneja el enrutamiento
    FormsModule,
    ReactiveFormsModule,
    ToastComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  
})


export class AppModule { }