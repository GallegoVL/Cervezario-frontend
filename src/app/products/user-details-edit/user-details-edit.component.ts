import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { checkTlfAsync, checkUserTlfValidation, numericValidation, validationDate } from '../../validators/validators.component';
import { User } from '../models/user';

@Component({
  selector: 'app-user-details-edit',
  imports: [FormsModule, RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-details-edit.component.html',
  styleUrl: './user-details-edit.component.css'
})
export class UserDetailsEditComponent {

  dateError: string = "";
  usernameError: string = "";
  tlfError: string = "";
  registerForm!: FormGroup;
  usernameTaken: boolean = false;
  tlfTaken: boolean = false;
  emailTaken: boolean = false;
  formSubmitted = false;
  userId: number = 0;
  user: User | null = null;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router){
     this.registerForm = this.fb.group({});
  }
    
  

  ngOnInit():void{
    this.service.getUsuarioActual().subscribe({
      next:(user:User) => {
        this.user = user
        this.userId = user.idusers;
        
        
        const rawDate = new Date(user.date);
        const year = rawDate.getFullYear();
        const month = String(rawDate.getMonth()+1).padStart(2,'0');
        const day = String (rawDate.getDate()).padStart(2,'0');
        const formattedDate = `${year}-${month}-${day}`;

        this.registerForm = this.fb.group({
          name: new FormControl (user.name, Validators.required),
          lastname : new FormControl (user.lastname, Validators.required),
          tlf: new FormControl (
            user.tlf,
            {
              validators:[
                Validators.required,
                numericValidation(),
                Validators.minLength(9),
                Validators.maxLength(15),
              ],
              
              asyncValidators:[checkUserTlfValidation(this.service,this.userId)],
              updateOn:'blur',
            }
          ),
          date: new FormControl(
           formattedDate,
          {
            validators:[
              Validators.required,
              validationDate()
            ]
          }),
          country: new FormControl (user.country, Validators.required)
        });
      },
      error: (err)=>{
        console.error("Error al cargar el usuario",err)
      }
    })
  }

  isTlfTaken(): boolean{
  return this.registerForm.get("tlf")?.hasError("tlfTaken2")??false;
  }

  
  onSubmit():void{
    this.formSubmitted= true;

    if(this.registerForm.invalid){
      return;
    }

    const updateUser: User ={
      idusers: this.userId,
      username: this.user!.username,
      email: this.user!.email,
      name: this.registerForm.get('name')?.value??'',
      lastname: this.registerForm.get('lastname')?.value??'',
      date: this.registerForm.get('date')?.value??'',
      country: this.registerForm.get('country')?.value??'',
      tlf: this.registerForm.get('tlf')?.value??'',
      enabled: this.user!.enabled,
    };

    this.service.update(updateUser).subscribe((response)=>{
         console.log('user actualizado');
          this.router.navigate(['/userdetails']);
         },
        (error) => {
          console.error("Error al actualizar el user", error);
        }
    )
  }
}
