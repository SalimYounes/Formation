import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../Entité/User.module';


@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  apiUrl="http://localhost:8080"
  loginUserUrl="http://localhost:8081/api/admin/login"
  helper=new JwtHelperService()
  

  constructor(private http:HttpClient) { }

  //User
  addUser(user:User){
    return this.http.post<any>(this.apiUrl+"/users",user);
  }

  onDeleteUser(id : string){
    const url =`${this.apiUrl+"/users"}/${id}` 
    return this.http.delete(url)
  }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/users");
  }

  loginUser(user:User){
    return this.http.post<any>(this.loginUserUrl, user);
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


}
