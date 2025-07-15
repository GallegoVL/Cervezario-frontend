import { Injectable } from '@angular/core';
import { Beer} from '../models/beer';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "/cervezas";
  private urlCantidad: string="/cervezas/cantidad/contar";
  private urlCantidadEtiquetas: string="/cervezas/cantidad/contar-etiquetas";
  private urlBeerUser: string = "/cervezas/{id}";
  private urlSearch: string = "/cervezas/searchlist";
  private urlSearchCountry: string = "/cervezas/searchlist/country";
  

  constructor(private http: HttpClient) { }

  findAll():Observable<Beer[]>{ //el tipo es de flujo Observable
    //return of(this.products); //el of coge un objeto comun y lo convierte a un tipo reactivo Observable
    
    return this.http.get<Beer[]>(this.url);
  }

  findById():Observable<Beer[]>{
    return this.http.get<Beer[]>(this.urlBeerUser);
  }

  create (beer: Beer): Observable<Beer>{
    return this.http.post<Beer>(this.url, beer);
  }

  update (beer: Beer): Observable<Beer>{
    return this.http.put<Beer>(`${this.url}/${beer.id}`, beer);
  }

  remove(id: number):Observable <void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  
  contar():Observable<number>{
    return this.http.get<number>(this.urlCantidad);
  }

  contarEtiquetas():Observable<number>{
    return this.http.get<number>(this.urlCantidadEtiquetas);
  }

  searchBeers(query: string): Observable<Beer[]>{
    const queryString = new HttpParams().set('query',query);
    return this.http.get<Beer[]>(`/cervezas/searchlist`, { params :queryString });
  }

  searchCountryBeers(query: string): Observable<Beer[]>{
    const queryString = new HttpParams().set('query', query);
    return this.http.get<Beer[]>(`${this.urlSearchCountry}`, {params:queryString});
  }
}
