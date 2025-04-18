import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Entité/User.module';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  UserForm:FormGroup
  constructor(private service :CrudserviceService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl('',[
        Validators.required ]),
    role: new FormControl( '', [
      Validators.required,]),}
     this.UserForm = this.fb.group(formControls)
   }
   get nom() {return this.UserForm.get('nom');}
  get prenom() { return this.UserForm.get('prenom');}
  get email() {return this.UserForm.get('email');}
  get password() {return this.UserForm.get('password');}
  get role() { return this.UserForm.get('role');}
 
  

   addNewUser() {
    let data = this.UserForm.value;
    console.log(data);
    let user = new User(
     undefined, data.nom,data.prenom,data.email,data.password,data.role);
    console.log(user);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.password == 0 ||
      data.role ==0 
      
    ){
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
      
    
    }else if(this.service.validateEmail(data.email)==false){
      this.toast.warning({
        detail: 'Error Message',
        summary: 'Veuillez vérifier votre email ou votre mot de passe.',
      });

    } else {
    this.service.addUser(user).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'User est Envoyé avec succés',
        });

        this.router.navigate(['/listeuser']);
      },
      err=>{
        console.log(err);

        if (err.status === 404) {
          console.error('User non trouvé :', err.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: ' Email existe déja !',
          });
          this.UserForm.get('email').reset();
        }  else {
          console.error('Probléme de serveur :', err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de serveur ',
          });
          this.UserForm.reset();

        }
      }
    )
  

    }
  }

  
    ngOnInit(): void {
      
    }
  
}