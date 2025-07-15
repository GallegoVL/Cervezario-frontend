import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../products/services/user.service';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { User } from '../products/models/user';

@Component({
  selector: 'app-validators',
  imports: [],
  templateUrl: './validators.component.html',
  styleUrl: './validators.component.css'
})
export class ValidatorsComponent {

  
}
export function numericValidation(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    const value = control.value;
    if(!value)return null;
    const isValid = /^\d+$/.test(value);
    return isValid? null : {notNumeric: true};
    }
}

export function checkUsernameAsync(service: UserService): AsyncValidatorFn{
  return (control:AbstractControl): Observable<ValidationErrors | null> =>{
    const username = control.value;
    if(!username || username.trim() === "") return of(null);

    return timer(500).pipe(
      switchMap(() => service.checkUsername(username)),
      map(exists => (exists ? { usernameTaken: true }: null)),
      catchError(() => of(null))
    );
  };
}

export function checkEmailAsync(service: UserService): AsyncValidatorFn{
  return(control:AbstractControl):Observable<ValidationErrors | null> =>{
    const email = control.value;
    if(!email || email.trim() === '') return of(null);

    return timer(500).pipe(
      switchMap(() => service.checkEmail(email)),
      map(exists => (exists ? {emailTaken: true}: null)),
      catchError(() => of(null))
    );
  };
}

export function checkTlfAsync(service: UserService): AsyncValidatorFn{
  return(control:AbstractControl):Observable<ValidationErrors | null> =>{
    const tlf = control.value;
    if(!tlf || tlf.trim() === '') return of(null);

    return timer(500).pipe(
      switchMap(() => service.checkTlf(tlf)),
      map(exists => (exists ? {tlfTaken: true}: null)),
      catchError(()=> of(null))
    );
  };
}

export function checkUserTlfValidation(service: UserService, currentUserId?: number):AsyncValidatorFn{
  return(control:AbstractControl):Observable<ValidationErrors|null> =>{
    const tlf = control.value;

    if(!tlf || tlf.trim() === ''){
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => service.checkUserTlf(tlf,currentUserId)),
      map((exists: boolean) => (exists ? {tlfTaken2: true}:null)),
      
      
        catchError(()=> of(null))
    );
  };
}

export function confirmPassword(): ValidatorFn{
  return (group: AbstractControl): ValidationErrors | null =>{
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : {noEquals: true}
  };
}

export function validationDate(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    const value: string = control.value;

    if(!value || !value.trim()){
      return {dateError: 'La fecha no puede estar vacia'};
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!regex.test(value)){
      return {dateError:'El formato debe ser AAAA-MM-DD'}
    }

    const[year,month,day] = value.split("-").map(Number);
    const birthDate = new Date(year,month - 1,day);

    const today = new Date();
    const ageLimit = new Date(today.getFullYear()-18, today.getMonth(),today.getDate());
 
    if(birthDate > ageLimit){
      return {dateError:'Debes tenerr al menos 18 años'}
    }

    return null;
  }
}