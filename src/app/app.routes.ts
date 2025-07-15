import { RouterModule, Routes } from '@angular/router';


import { NgModule } from '@angular/core';
import { ProductComponent } from './products/beer-component/product.component';
import { authGuard } from './guards/auth.guard';
import { RegisterFormComponent } from './products/register-form/register-form.component';
import { UserFormComponent } from './products/user-form/user-form.component';
import { UserComponent } from './products/user-component/user.component';
import { UserDetailsComponent } from './products/user-details/user-details.component';
import { FormBeer } from './products/beer-form/beer.form.component';
import { PaginaPrincipalComponent } from './products/pagina-principal/pagina-principal.component';
import { CreateBeerComponent } from './products/create-beer/create-beer.component';
import { UserDetailsEditComponent } from './products/user-details-edit/user-details-edit.component';
import { UserAddBeerComponent } from './products/user-add-beer/user-add-beer.component';
import { UserContactComponent } from './products/user-contact/user-contact.component';

export const routes: Routes = [
    
    {path:"", component: UserFormComponent},
    {path:"register" , component: UserComponent},
    {path:"product", component: ProductComponent, canActivate:[authGuard]},
    {path:"userdetails", component: UserDetailsComponent, canActivate:[authGuard]},
    {path:"addBeer", component: FormBeer, canActivate:[authGuard]},
    {path:"paginaPrincipal", component: PaginaPrincipalComponent, canActivate:[authGuard]},
    {path:"crearCerveza", component: CreateBeerComponent, canActivate:[authGuard]},
    {path:"editUser", component: UserDetailsEditComponent, canActivate:[authGuard]},
    {path:"userAddBeer", component: UserAddBeerComponent, canActivate:[authGuard]},
    {path: "userContact", component: UserContactComponent, canActivate:[authGuard]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})

export class AppRoutingModule{}
