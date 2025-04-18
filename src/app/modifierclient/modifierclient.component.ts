import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import { Client } from '../Entité/Client.module';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modifierclient',
  templateUrl: './modifierclient.component.html',
  styleUrls: ['./modifierclient.component.css']
})
export class ModifierclientComponent {
  updateForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private service: CrudserviceService,
    private route: Router,
    private router: ActivatedRoute,
    private toast: NgToastService
  ) {
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(3),
      ]),
     
      prenom: new FormControl('', [Validators.required]),
      
      
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      mp: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
     
    };
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get prenom() {
    return this.updateForm.get('prenom');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get mp() {
    return this.updateForm.get('mp');
  }
  get age() {
    return this.updateForm.get('age');
  }
  get tel() {
    return this.updateForm.get('tel');
  }



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findClientById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom, 
        email: event.email,
        mp:event.mp,
        age: event.age, 
        tel: event.tel
        

      });}); }
  updateClient() {
    let data = this.updateForm.value;
    let client =new Client(
      this.id,
      data.nom,
      data.prenom, 
      data.email,
      data.mp,
      data.age,
      data.tel);
    console.log(client);
    console.log(data);
    if(
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.mp == 0 ||
      data.age ==0 ||
      data.tel==0
      
    ){
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    }else if(this.service.validateEmail(data.email)==false){
      this.toast.warning({
        detail: 'Error Message',
        summary: 'kkkkk',
      });

    }else if(this.service.validatePhone(data.tel)==false) {

      this.toast.error({
        detail: 'Error Message',
        summary: 'Veuillez entrer un numéro de téléphone valide.',
      });
      
      this.updateForm.get('tel').reset();
    }else{
    this.service.updateClient(this.id,client).subscribe((res) => {
      console.log(res);
      this.toast.success({
        detail: 'Succes Message',
        summary:'Votre modification a été effectuée avec succès',
    
      });
      this.route.navigate(['/listeclients'])});
    }
     }
}
