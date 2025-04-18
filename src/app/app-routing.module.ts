import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { ListeSalleDeSportComponent } from './liste-salle-de-sport/liste-salle-de-sport.component';
import { ListeCoachsComponent } from './liste-coachs/liste-coachs.component';
import { ListeclientsComponent } from './listeclients/listeclients.component';
import { ListeAbonnementsComponent } from './liste-abonnements/liste-abonnements.component';
import { ListecontactComponent } from './listecontact/listecontact.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModifierclientComponent } from './modifierclient/modifierclient.component';
import { ModifiercoachComponent } from './modifiercoach/modifiercoach.component';
import { ModifiersalleComponent } from './modifiersalle/modifiersalle.component';
import { AuthGuard } from './service/Auth.service';
import { AddtrainerComponent } from './addtrainer/addtrainer.component';
import { AjoutercoachComponent } from './ajoutercoach/ajoutercoach.component';
import { AjoutersalleComponent } from './ajoutersalle/ajoutersalle.component';
import { ProfileComponent } from './profile/profile.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';
import { ListecoachsalleComponent } from './listecoachsalle/listecoachsalle.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ListuserComponent } from './listuser/listuser.component';

const routes: Routes = [
{path:'adduser',component:AdduserComponent, canActivate:[AuthGuard]},
  {path:'listuser',component:ListuserComponent, canActivate:[AuthGuard]},
  {path:'modifieradmin/:id',component:ModifieradminComponent, canActivate:[AuthGuard]},
  {path:'listesalledesport',component:ListeSalleDeSportComponent, canActivate:[AuthGuard]},
  {path:'listecoachs',component:ListeCoachsComponent, canActivate:[AuthGuard]},
  {path:'listeclients',component:ListeclientsComponent, canActivate:[AuthGuard]},
  {path:'listeabonnements',component:ListeAbonnementsComponent, canActivate:[AuthGuard]},
  {path:'listecontact',component:ListecontactComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent ,canActivate:[AuthGuard]},
  {path:'modifierclient/:id',component:ModifierclientComponent ,canActivate:[AuthGuard]},
  {path:'modifiercoach/:id',component:ModifiercoachComponent ,canActivate:[AuthGuard]},
  {path:'modifiersalle/:id',component:ModifiersalleComponent ,canActivate:[AuthGuard]},
  {path:'addtrainer',component:AddtrainerComponent, canActivate:[AuthGuard]},
  {path:'ajoutercoach',component:AjoutercoachComponent, canActivate:[AuthGuard]},
  {path:'ajoutersalle',component:AjoutersalleComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'modifierprofil/:id',component:ModifierprofilComponent,canActivate:[AuthGuard]},
  {path:'listecoachsalle',component:ListecoachsalleComponent,canActivate:[AuthGuard]},
  {path:"",redirectTo:"login", pathMatch:"full",}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
