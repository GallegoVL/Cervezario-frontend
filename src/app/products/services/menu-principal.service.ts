import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {


  private _mostrarMenu = new BehaviorSubject<boolean>(true);
  mostrarMenu$ = this._mostrarMenu.asObservable();

  setMostrarMenu(valor: boolean){
    this._mostrarMenu.next(valor);
  }

  

}
