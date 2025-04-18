import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Coach } from '../Entité/Coach.module';
import { CrudserviceService } from '../service/crudservice.service';
import { SalleDeSport } from '../Entité/SalleDeSport.module';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modifiersalle',
  templateUrl: './modifiersalle.component.html',
  styleUrls: ['./modifiersalle.component.css']
})
export class ModifiersalleComponent {
  updateForm: FormGroup;
  id: number;
  userDetails:any;
  currentEtat:any;

  constructor(
    private fb: FormBuilder,
    private service: CrudserviceService,
    private route: Router,
    private router: ActivatedRoute,
    private toast:NgToastService
  ) {
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(4),
      ]),
     
      adresse: new FormControl('', [Validators.required]),

      
      email: new FormControl('', [Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),

      mp: new FormControl('', [Validators.required]),


      tel: new FormControl('', [Validators.required]),
     
    };
    this.updateForm = this.fb.group(formControles);
    this.userDetails = this.service.userDetails();
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get adresse() {
    return this.updateForm.get('adresse');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get mp() {
    return this.updateForm.get('mp');
  }
  get tel() {
    return this.updateForm.get('tel');
  }



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findSalleById(idEvent).subscribe((result) => {
      let event = result;
      this.currentEtat = event.etat;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        adresse: event.adresse,
        email: event.email,
        mp: event.mp,
        tel: event.tel, });}); }
  updateSalle() {
    let data = this.updateForm.value;
    
    let salledesport =new SalleDeSport(
      this.id,
      data.nom,
      data.adresse,
      data.email,
      data.mp,
      data.tel,
      this.currentEtat );
    console.log(salledesport);
    console.log(data);
    if(
      data.nom == 0 ||
      data.prenom == 0||
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
        summary: 'Veuillez vérifier votre email.',
      });

    }else if(this.service.validatePhone(data.tel)==false) {

      this.toast.error({
        detail: 'Error Message',
        summary: 'Veuillez entrer un numéro de téléphone valide.',
      });
      
      this.updateForm.get('tel').reset();
    }else{
    this.service.updateSalle(this.id,salledesport).subscribe((res) => {
      console.log(res);
      
      this.toast.success({
        detail: 'Succes Message',
        summary:'Votre modification a été effectuée avec succès',
    
      });
      this.route.navigate(['/listesalledesport'])}); } }
}
