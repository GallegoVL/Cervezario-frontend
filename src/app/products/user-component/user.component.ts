import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user',
  imports: [RegisterFormComponent, CommonModule, RouterOutlet ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent{

    user: User= new User();
    userSelected: User = new User();

  constructor(private service: UserService, private cdr: ChangeDetectorRef,private toast: ToastService){}

  addUser(user: User): void{
    this.service.register(user).subscribe((response)=>{
        console.log("Usuario registrado con exito",response);
        this.toast.show("Usuario registrado con exito",'success');
        this.user={...response}
    },(error=>{
      console.error("Error al registar el usuario", error);
      this.toast.show("Error al registrar el Usuario",'error');
    })
  )
  this.userSelected=new User();
  }
}
