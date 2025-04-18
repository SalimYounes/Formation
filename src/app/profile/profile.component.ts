import { Component } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { Admin } from '../Entité/Admin.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  updateForm: FormGroup;
  userDetails: any;
  id: number;
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
     
      prenom: new FormControl('', [Validators.required]),

      
      email: new FormControl('', [Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),

      

      mp: new FormControl('', [Validators.required]),

      role: new FormControl('', [Validators.required]),

    
     
    };
    this.updateForm = this.fb.group(formControles);
    this.userDetails = this.service.userDetails();
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
  



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findAdminById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom,
        email: event.email,
        mp: event.mp,

        
       });}); 
  }
  updateAdmin() {
    let datas =this.service.userDetails();
    let data = this.updateForm.value;
    let admin =new Admin(
      this.id,
      data.nom,
      data.prenom, 
      data.email,
      data.mp);
    console.log(admin);
    console.log(data);
    if(
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.mp == 0
      
      
    ){
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
  

    }else{
    this.service.updateAdmin(this.id,admin).subscribe((res) => {
      console.log(res);
      let token = res.token;
      localStorage.setItem("myToken",res.token);
      this.userDetails=this.service.userDetails();
      this.toast.success({
        detail: 'Succes Message',
        summary:'Votre modification a été effectuée avec succès',
    
      });

  
      this.route.navigate(['/profiladmin']).then(() => {
        window.location.reload();
      });
      
    }); 
  } 
  }

}
