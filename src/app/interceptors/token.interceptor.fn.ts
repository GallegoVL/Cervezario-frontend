import { Inject, inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenInterceptor } from './token.interceptor';

export const tokenInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {


  if(req.url.includes("/login")){
    return next(req)
}
  const interceptor = inject(TokenInterceptor);
  const handler : HttpHandler={ handle: next};
  
  return interceptor.intercept(req, handler);
};