import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudserviceService } from '../service/crudservice.service';
import { Client } from '../Entité/Client.module';

@Component({
  selector: 'app-ajouterclient',
  templateUrl: './ajouterclient.component.html',
  styleUrls: ['./ajouterclient.component.css']
})
export class AjouterclientComponent {
  ClientForm:FormGroup
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
      mp: new FormControl('',[
        Validators.required ]),
    age: new FormControl( '', [
      Validators.required,]),
      tel: new FormControl( '', [
        Validators.required,]),
    }
      
     this.ClientForm = this.fb.group(formControls)
   }
  get nom() {return this.ClientForm.get('nom');}
  get prenom() { return this.ClientForm.get('prenom');}
  get email() {return this.ClientForm.get('email');}
  get mp() {return this.ClientForm.get('mp');}
  get age() { return this.ClientForm.get('age');}
  get tel() { return this.ClientForm.get('tel');}
 
  

   addNewClient() {
    let data = this.ClientForm.value;
    console.log(data);
    let client = new Client(
     undefined, data.nom,data.prenom,data.email,data.mp,data.age,data.tel);
    console.log(client);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.mp == 0 ||
      data.age ==0 ||
      data.tel ==0
      
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

    }else if(this.service.validatePhone(data.tel)==false) {

      this.toast.error({
        detail: 'Error Message',
        summary: 'Veuillez entrer un numéro de téléphone valide.',
      });
      
      this.ClientForm.get('tel').reset();
    } else {
    this.service.addClient(client).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Client est Envoyé avec succés',
        });

        this.router.navigate(['/listeclients']);
      },
      err=>{
        console.log(err);

        if (err.status === 404) {
          console.error('Client non trouvé :', err.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: ' Email existe déja !',
          });
          this.ClientForm.get('email').reset();
        }  else {
          console.error('Probléme de serveur :', err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de serveur ',
          });
          this.ClientForm.reset();

        }
      }
    )

    }
  }

  
    ngOnInit(): void {
      
    }

}
