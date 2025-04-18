import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SalleDeSport } from '../Entité/SalleDeSport.module';
import { CrudserviceService } from '../service/crudservice.service';

@Component({
  selector: 'app-ajoutersalle',
  templateUrl: './ajoutersalle.component.html',
  styleUrls: ['./ajoutersalle.component.css']
})
export class AjoutersalleComponent {
  SalleForm:FormGroup
  constructor(private service :CrudserviceService,private router:Router,private fb:FormBuilder,private toast:NgToastService,) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      adresse: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      mp: new FormControl('',[
        Validators.required ]),
      tel: new FormControl( '', [
        Validators.required,])}
     this.SalleForm = this.fb.group(formControls)
   }
   get nom() {return this.SalleForm.get('nom');}
  get adresse() { return this.SalleForm.get('adresse');}
  get email() {return this.SalleForm.get('email');}
  get mp() {return this.SalleForm.get('mp');}
  get tel() { return this.SalleForm.get('tel');}
 
  

   addNewSalle() {
    let data = this.SalleForm.value;
    console.log(data);
    let salle = new SalleDeSport(
     undefined, data.nom,data.adresse,data.email,data.mp,data.tel);
    console.log(salle);

    if (
      data.nom == 0 ||
      data.adresse == 0||
      data.email == 0 ||
      data.mp == 0 ||
      data.tel==0
      
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

    } else if(this.service.validatePhone(data.tel)==false) {

      this.toast.error({
        detail: 'Error Message',
        summary: 'Veuillez entrer un numéro de téléphone valide.',
      });
      
      this.SalleForm.get('tel').reset();
    }else {
    this.service.addSalle(salle).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Salle de sport est Envoyé avec succés',
        });

        this.router.navigate(['/listesalledesport']);
      },
      err=>{
        console.log(err);

        if (err.status === 404) {
          console.error('Client non trouvé :', err.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: ' Email existe déja !',
          });
          this.SalleForm.get('email').reset();
        }  else {
          console.error('Probléme de serveur :', err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de serveur ',
          });
          this.SalleForm.reset();

        }
      }
    )

    }
  }

  
    ngOnInit(): void {
      
    }

}
