import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudserviceService } from '../service/crudservice.service';
import { Coach } from '../Entité/Coach.module';

@Component({
  selector: 'app-ajoutercoach',
  templateUrl: './ajoutercoach.component.html',
  styleUrls: ['./ajoutercoach.component.css']
})
export class AjoutercoachComponent {
  CoachForm:FormGroup
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
      tel: new FormControl( '', [
        Validators.required,]),
    }
      
     this.CoachForm = this.fb.group(formControls)
   }
  get nom() {return this.CoachForm.get('nom');}
  get prenom() { return this.CoachForm.get('prenom');}
  get email() {return this.CoachForm.get('email');}
  get mp() {return this.CoachForm.get('mp');}
  get tel() { return this.CoachForm.get('tel');}
 
  

   addNewCoach() {
    let data = this.CoachForm.value;
    console.log(data);
    let coach = new Coach(
     undefined, data.nom,data.prenom,data.email,data.mp,data.tel);
    console.log(Coach);

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

    } else if(this.service.validatePhone(data.tel)==false) {

      this.toast.error({
        detail: 'Error Message',
        summary: 'Veuillez entrer un numéro de téléphone valide.',
      });
      
      this.CoachForm.get('tel').reset();
    }else {
    this.service.addCoach(coach).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Coach est Envoyé avec succés',
        });

        this.router.navigate(['/listecoachs']);
      },
      err=>{
        console.log(err);

        if (err.status === 404) {
          console.error('Client non trouvé :', err.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: ' Email existe déja !',
          });
          this.CoachForm.get('email').reset();
        }  else {
          console.error('Probléme de serveur :', err);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Coach est Envoyé avec succés ',
          });
          this.CoachForm.reset();

        }
      }
    )

    }
  }

  
    ngOnInit(): void {
      
    }

}
