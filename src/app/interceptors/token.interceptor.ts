
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../products/services/user.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn:"root"
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service: UserService, private router:Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("Interceptando solicitud...",request);
    const token = localStorage.getItem("token");
    const isPublic = request.url.includes("/login") || request.url.includes("/user/register") || request.url.includes('/check-username')|| request.url.includes('/check-tlf') || request.url.includes('/check-email');

    if(isPublic){
      return next.handle(request);
    }
    
   if (token) {
      // Si el token existe, agregamos el header Authorization con el token
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Agrega el token en el header
        }
      });
      //console.log('Token agregado al header:', clonedRequest.headers.get("Authorization"));
      return next.handle(clonedRequest); // Pasamos la solicitud con el token agregado
    }

    if (token && this.service.isTokenExpired(token)){
      this.service.logOut();
      this.router.navigate(['/login']);
      return throwError(()=> new Error('Token expirado'))
    }

    // Si no hay token, simplemente pasa la solicitud original sin cambios
    return next.handle(request);
  }
}