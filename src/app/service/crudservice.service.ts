import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Entité/Client.module';
import { Coach } from '../Entité/Coach.module';
import { Contact } from '../Entité/Contact.module';
import { SalleDeSport } from '../Entité/SalleDeSport.module'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Abonnement } from '../Entité/Abonnement.module';
import { CoachSalle } from '../Entité/CoachSalle.module';
import { User } from '../Entité/User.module';
import { Trainer } from '../Entité/Trainer.module';


@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  apiUrl="http://localhost:8081/api"
  loginUserUrl="http://localhost:8081/api/admin/login"
  helper=new JwtHelperService()
  

  constructor(private http:HttpClient) { }

  //User
  addUser(user:User){
    return this.http.post<any>(this.apiUrl+"/users",user);
  }

  onDeleteUser(id : number){
    const url =`${this.apiUrl+"/users"}/${id}` 
    return this.http.delete(url)
  }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/users");
  }

  loginUser(user:User){
    return this.http.post<any>(this.loginUserUrl, user);
  }

  //Trainer
  addTrainer(trainer:Trainer){
    return this.http.post<any>(this.apiUrl+"/formateurs",trainer);
  }

  onDeleteClient(id : number){
    const url =`${this.apiUrl+"/client"}/${id}` 
    return this.http.delete(url)
  }

  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl + "/client");
  }

  //coach
  addCoach(coach:Coach){
    return this.http.post<any>(this.apiUrl+"/coach",coach);
  }

  onDeleteCoach(id : number){
    const url =`${this.apiUrl+"/coach"}/${id}` 
    return this.http.delete(url)
  }

  getCoach(): Observable<Coach[]>{
    return this.http.get<Coach[]>(this.apiUrl + "/coach");
  }

  //contact
  onDeleteContact(id : number){
    const url =`${this.apiUrl+"/contact"}/${id}` 
    return this.http.delete(url)
  }

  getContact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl + "/contact");
  }

  //salle
  addSalle(salledesport:SalleDeSport){
    return this.http.post<any>(this.apiUrl+"/salledesport",salledesport);
  }

  onDeleteSalle(id : number){
    const url =`${this.apiUrl+"/salledesport"}/${id}` 
    return this.http.delete(url)
  }

  getSalle(): Observable<SalleDeSport[]>{
    return this.http.get<SalleDeSport[]>(this.apiUrl + "/salledesport");
  }


//modifieruser

  updateUser(id:number,user: User) {
    const url = `${this.apiUrl+"/users"}/${id}`
    return this.http.put<any>(url, user);
  }


 

  findUserById(id : number): Observable<User> {
    const url = `${this.apiUrl + "/users"}/${id}`
    return this.http.get<User>(url)
  }


  //modifierclient

  updateClient(id:number,client: Client) {
    const url = `${this.apiUrl+"/client"}/${id}`
    return this.http.put<any>(url, client);
  }


 

  findClientById(id : number): Observable<Client> {
    const url = `${this.apiUrl + "/client"}/${id}`
    return this.http.get<Client>(url)
  }


  //modifiercoach

  updateCoach(id:number,coach: Coach) {
    const url = `${this.apiUrl+"/coach"}/${id}`
    return this.http.put<any>(url, coach);
  }


 

  findCoachById(id : number): Observable<Coach> {
    const url = `${this.apiUrl + "/coach"}/${id}`
    return this.http.get<Coach>(url)
  }


  //modifiersalle

  updateSalle(id:number,salledesport: SalleDeSport) {
    const url = `${this.apiUrl+"/salledesport"}/${id}`
    return this.http.put<any>(url, salledesport);
  }


 

  findSalleById(id : number): Observable<SalleDeSport> {
    const url = `${this.apiUrl + "/salledesport"}/${id}`
    return this.http.get<SalleDeSport>(url)
  }


  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }


   isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  validateEmail(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

//Abonnemnt
getAbonnement(): Observable<Abonnement[]>{
  return this.http.get<Abonnement[]>(this.apiUrl +"/abonnement")
}

getCoachSalle(): Observable<CoachSalle[]>{
  return this.http.get<CoachSalle[]>(this.apiUrl +"/coachsalle")
}

validatePhone(tel: string): boolean {
  const regex: RegExp = /^[2-9][0-9]{7}$/;
  return regex.test(tel);
}
}
