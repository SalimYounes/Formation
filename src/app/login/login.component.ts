import { Component } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Admin } from '../Entité/Admin.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentYear: number;
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudserviceService,
    private router:Router,private toast:NgToastService
  ) { 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      mp: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }
  
  get email() { return this.loginForm.get('email') }
  get mp() { return this.loginForm.get('mp') }
  ngOnInit(): void { 
    this.currentYear = new Date().getFullYear();
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let admin = new Admin(null,null,null,data.email,data.mp,);
    console.log(admin);
    if (
  
      data.email == 0 ||
      data.mp == 0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.loginAdmin(admin).subscribe(
        res=>{
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken",res.token);
          this.router.navigate(['/home']).then(()=>window.location.reload());
      },
       
      error => {
        // Gestion des erreurs
        if (error.status === 404) {
          console.error('Admin non trouvé :', error.error.message);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Admin non trouvé',
          });
        } else if (error.status === 401) {
          console.error('Mot de passe incorrect :', error.error.message);

          this.toast.error({
            detail: 'Error Message',
            summary: 'Mot de passe incorrect',
          });
        } else {
          console.error('Probléme de serveur :', error);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de serveur ',
          });

        }
      }
      )
      
    }
    }

}
