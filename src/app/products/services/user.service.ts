import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { UsernameCheckResponse } from '../models/username.checkc.response';
import { Beer } from '../models/beer';
import { BeerWithEtiquetas } from '../models/beer-with-etiquetas';
import {jwtDecode} from 'jwt-decode';
import { CountryWithNumber } from '../models/country-with-number';
import { BrewWithNumber } from '../models/brew-with-number';

interface JwtPayload {
  authorities: string[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlLogin: string="/login";
  private urlRegister: string = "/users/register";
  private urlUsers: string = "/users";
  private urlUserPerfil: string ="/users/perfil";
  private urlUserCervezas: string = "/users/mis-cervezas";
  private urlCantidadCervezas: string = "/users/mis-cervezas/contar";
  private urlCantidadEtiquetas: string = "/users/mis-cervezas/contar-etiquetas";
  private urlUserCervezasGraduation: string = "/users/mis-cervezas/graduation";
  private urlUserCervezasEtiquetas: string = "/users/mis-cervezas/etiquetas";
  private urlUserCervezasCountry: string = "/users/mis-cervezas/country";
  private urlUserCervezasCountry1: string = "/users/mis-cervezas/country1";
  private urlUserCervezasBrew: string = "/users/mis-cervezas/brew";
  private urlUserCervezasBrew1: string = "/users/mis-cervezas/brew1";
  private urlContactEmail: string = "/contact/email";
  private urlGuardarMisCervezas: string = "/users/mis-cervezas";
  private urlEliminarCervezaUser: string = "/users/mis-cervezas"

  constructor(private http: HttpClient) { }

   login(credentials: {username: string; password:string}){
      return this.http.post<{token: string}>(this.urlLogin,credentials).pipe(
        tap((response)=>{
          if(response && response.token){
            //console.log("Token recibido", response.token);
            this.saveToken(response.token);
          }
        })
      );
        }

    getUsuarioActual(): Observable<User> {
      return this.http.get<User>(this.urlUserPerfil)
    }
  
    getMisCerevezas(): Observable<BeerWithEtiquetas[]>{
      return this.http.get<BeerWithEtiquetas[]>(this.urlUserCervezas);
    }
    guardarMisCervezas(beers: BeerWithEtiquetas[]){
      return this.http.put<BeerWithEtiquetas[]>(this.urlGuardarMisCervezas,beers);
    }
    eliminarMisCervezas(beerId: number): Observable <any>{
      return this.http.delete(`${this.urlEliminarCervezaUser}/${beerId}`);
    }
    updateEtiquetas(beerId: number, etiquetas:number){
      return this.http.put(`${this.urlUserCervezas}/${beerId}`,{etiquetas});
    }
    contarCervezas():Observable<number>{
    return this.http.get<number>(this.urlCantidadCervezas);
    }
    contarEtiquetas():Observable<number>{
    return this.http.get<number>(this.urlCantidadEtiquetas);
    }
    getCervezasGraduation():Observable<Beer[]>{
      return this.http.get<Beer[]>(this.urlUserCervezasGraduation);
    }
    getCervezasEtiquetas():Observable<BeerWithEtiquetas[]>{
      return this.http.get<Beer[]>(this.urlUserCervezasEtiquetas);
    }
    getCervezasCountry():Observable<CountryWithNumber[]>{
      return this.http.get<CountryWithNumber[]>(this.urlUserCervezasCountry);
    }
    getCervezasCountry1():Observable<CountryWithNumber>{
      return this.http.get<CountryWithNumber>(this.urlUserCervezasCountry1);
    }
    getCervezasBrew():Observable<BrewWithNumber[]>{
      return this.http.get<BrewWithNumber[]>(this.urlUserCervezasBrew);
    }
    getCervezasBrew1():Observable<BrewWithNumber>{
      return this.http.get<BrewWithNumber>(this.urlUserCervezasBrew1);
    }
    
    
    saveToken(token: string){
      localStorage.setItem("token",token);
    }
    getToken(): string | null{
      return localStorage.getItem("token");
    }
    getRoles(): string[]{
      const token = this.getToken();
      if(!token) return [];

      try{
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.authorities || [];
      }catch (e){
        console.error("Token invalido");
        return [];
      }
    }
    isAdmin():boolean{
      return this.getRoles().includes("ROLE_ADMIN");
    }
    logOut(){
      localStorage.removeItem("token");
    }
    isLoggenIn(): boolean{
      return !!this.getToken();
    }
    isTokenExpired(token: string): boolean{
      if(!token) return true;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now()/1000);
      return exp < now;
    }
    register(user : User): Observable <User>{
      return this.http.post<User>(this.urlRegister,user)
    }
    //PONER ESTA RUTA EN EL BACKEND
    update(user : User): Observable <User>{
      console.log("Datos hacia el backend", user)
      return this.http.put<User>(`${this.urlUsers}/${user.idusers}`,user)
    }
    
    
    //Validaciones-----------

    checkUsername(username: string): Observable<boolean>{
      return this.http.get<boolean>(`${this.urlUsers}/check-username?username=${username}`);
      
    }

    checkTlf(tlf: string): Observable<boolean>{
      return this.http.get<boolean>(`${this.urlUsers}/check-tlf?tlf=${tlf}`);
      
    }

    checkEmail(email: string): Observable<boolean>{
      return this.http.get<boolean>(`${this.urlUsers}/check-email?email=${email}`);
      
    }

    checkUserTlf(tlf: string, id?: number): Observable<boolean>{
      const idParam = id !== undefined ? id : '';
      return this.http.get<boolean>(`${this.urlUsers}/usertlf?tlf=${tlf}&id=${id}`);

    }

    //---------------------------------------------------------------------

    sendContactEmail(su: string, te: string): void{
      const emailData={
        subject: su,
        text: te
      };

      this.http.post(this.urlContactEmail,emailData)
        .subscribe({
          next: () => alert('Correo enviado'),
          error: (err) => {
            console.error('ERROR', err);
            alert('Error al enviar el correo');
          }
        });
    }
}
