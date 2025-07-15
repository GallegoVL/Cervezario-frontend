import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-user-form',
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

username="";
password="";

//constructor(private router:Router, private  service: ProductService){}
constructor(private toast:ToastService,private router:Router, private  service: UserService, private cd: ChangeDetectorRef){}

login(){
  this.service.login({ username: this.username,password: this.password})
  .subscribe({
    next:(res: any)=>{
      this.service.saveToken(res.token);
      console.log("Token guardado", res.token)


      this.goToBeers()
      //this.router.navigate(["/product"])
    },
    error:(err)=>{
      this.toast.show('Usuario o contraseña incorrectos','error');
    }
  })
}

goToBeers() {
  console.log("Redirigiendo a /paginaPrincipal")

  this.router.navigateByUrl('/paginaPrincipal',{skipLocationChange: true}).then(()=>{
    this.router.navigate(['/paginaPrincipal']).then(succes =>{
    if(succes){
      console.log("Navegacion con exito");
      this.cd.detectChanges();
    }else{
      console.log("Error en la navegación")
    }
});
});
}

onSubmit() {
 console.log("Acceso permitido");
 this.login();
}

isHomePage(): boolean {
  return this.router.url==="/";
}
}
