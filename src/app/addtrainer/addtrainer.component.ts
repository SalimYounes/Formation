import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudserviceService } from '../service/crudservice.service';
import { Trainer } from '../Entité/Trainer.module';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent {
  TrainerForm:FormGroup
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
      
     this.TrainerForm = this.fb.group(formControls)
   }
  get nom() {return this.TrainerForm.get('nom');}
  get prenom() { return this.TrainerForm.get('prenom');}
  get email() {return this.TrainerForm.get('email');}
  get mp() {return this.TrainerForm.get('mp');}
  get age() { return this.TrainerForm.get('age');}
  get tel() { return this.TrainerForm.get('tel');}
 
  

   addNewTrainer() {
    let data = this.TrainerForm.value;
    console.log(data);
    let trainer = new Trainer(
     undefined, data.nom,data.prenom,data.email,data.mp,data.age,data.tel);
    console.log(trainer);

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
      
      this.TrainerForm.get('tel').reset();
    } else {
    this.service.addTrainer(trainer).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Trainer est Envoyé avec succés',
        });

        this.router.navigate(['/listeTrainer']);
      },
      err=>{
        console.log(err);

        if (err.status === 404) {
          console.error('Trainer non trouvé :', err.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: ' Email existe déja !',
          });
          this.TrainerForm.get('email').reset();
        }  else {
          console.error('Probléme de serveur :', err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de serveur ',
          });
          this.TrainerForm.reset();

        }
      }
    )

    }
  }

  
    ngOnInit(): void {
      
    }

}
