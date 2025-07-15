import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { catchError, debounceTime, map, switchMap, take, timestamp } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';
import { UsernameCheckResponse } from '../models/username.checkc.response';
import { checkEmailAsync, checkTlfAsync, checkUsernameAsync, confirmPassword, numericValidation, validationDate } from '../../validators/validators.component';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
 
  
  
  @Input() user: User = { //el input es por que ahora los datos vienen del padre
    idusers: 0,
    username:"",
    password:"",
    name:"",
    lastname:"",
    email:"",
    tlf: "",
    date:"",
    country:"",
    enabled:true,
};
@Output() newUserEvent = new EventEmitter<User>(); //con esta linea vamos a emitir este objeto al padre, que es product.components.ts

dateError: string = "";
usernameError: string = "";
tlfError: string = "";
registerForm: FormGroup;
usernameTaken: boolean = false;
tlfTaken: boolean = false;
emailTaken: boolean = false;
formSubmitted = false;




constructor(private fb: FormBuilder, private service: UserService, private router: Router){
  this.registerForm =  this.fb.group({
    username: new FormControl ('',
      {
        validators: [Validators.required],
        asyncValidators: [checkUsernameAsync(this.service)],
        updateOn: 'change'
     }),
    password: new FormControl ('', Validators.required),
    confirmPassword: new FormControl ('', Validators.required),
    name:  new FormControl('', Validators.required),
    lastname:  new FormControl('', Validators.required),
    email: new FormControl('', 
      {
        validators:[Validators.required, 
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
        asyncValidators: [checkEmailAsync(this.service)],         
        updateOn: 'change'        
      }),
    tlf: new FormControl('',
      { 
        validators:[Validators.required, 
                    numericValidation(),
                    Validators.minLength(9),
                    Validators.maxLength(15)
                  ],
        asyncValidators: [checkTlfAsync(this.service)],
        updateOn:'change'
      }),
    date: new FormControl ('', 
      {
        validators:[Validators.required,
                    validationDate()
        ]}),
    country: new FormControl('', Validators.required),
  },{validators : confirmPassword()});
  
  this.registerForm.get('username')?.statusChanges.subscribe(status => {
    console.log("username status:", status);
    console.log("username errors:", this.registerForm.get('username')?.errors);
  });
  this.registerForm.get('tlf')?.statusChanges.subscribe(status => {
    console.log("tlf status:", status);
    console.log("tlf errors:", this.registerForm.get('tlf')?.errors);
  });
  this.registerForm.get('email')?.statusChanges.subscribe(status => {
    console.log("email status:", status);
    console.log("email errors:", this.registerForm.get('email')?.errors);
  });
}


isUsernameTaken(): boolean{
  return this.registerForm.get("username")?.hasError("usernameTaken")??false;
}
isTlfTaken(): boolean{
  return this.registerForm.get("tlf")?.hasError("tlfTaken")??false;
}
isEmailTaken(): boolean{
  return this.registerForm.get("email")?.hasError("emailTaken")??false;
}



onSubmit() :void {
  this.formSubmitted = true;

  if(this.registerForm.valid && !this.dateError){
    console.log("SE EJECUTA ONSUBMIT", this.user)
    const formValue =this.registerForm.value;

    const newUser: User = {
      ...formValue,
      id:0,
      enabled: true,
    };

    console.log("Emitimos al padre",this.user);
      this.newUserEvent.emit(newUser);
    
      this.registerForm.reset();
      this.formSubmitted = false;

      setTimeout(() =>{
        this.router.navigateByUrl('/');
      },1500);
      
  }else{
    console.warn("Formulario invalido,revise los datos")
  }
  
}
}
