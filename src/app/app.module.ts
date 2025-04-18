import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { ListeSalleDeSportComponent } from './liste-salle-de-sport/liste-salle-de-sport.component';
import { ListeCoachsComponent } from './liste-coachs/liste-coachs.component';
import { ListeclientsComponent } from './listeclients/listeclients.component';
import { ListeAbonnementsComponent } from './liste-abonnements/liste-abonnements.component';
import { ListecontactComponent } from './listecontact/listecontact.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http';
import { NgToastComponent, NgToastModule } from 'ng-angular-popup';
import { ModifierclientComponent } from './modifierclient/modifierclient.component';
import { ModifiercoachComponent } from './modifiercoach/modifiercoach.component';
import { ModifiersalleComponent } from './modifiersalle/modifiersalle.component';
import { AjouterclientComponent } from './ajouterclient/ajouterclient.component';
import { AjoutercoachComponent } from './ajoutercoach/ajoutercoach.component';
import { AjoutersalleComponent } from './ajoutersalle/ajoutersalle.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListecoachsalleComponent } from './listecoachsalle/listecoachsalle.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { AddtrainerComponent } from './addtrainer/addtrainer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ModifieradminComponent,
    ListeSalleDeSportComponent,
    ListeCoachsComponent,
    ListeclientsComponent,
    ListeAbonnementsComponent,
    ListecontactComponent,
    LoginComponent,
    HomeComponent,
    ModifierclientComponent,
    ModifiercoachComponent,
    ModifiersalleComponent,
    AjouterclientComponent,
    AjoutercoachComponent,
    AjoutersalleComponent,
    ProfileComponent,
    ModifierprofilComponent,
    ListecoachsalleComponent,
    AdduserComponent,
    ListuserComponent,
    AddtrainerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
